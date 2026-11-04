"""Import a browser capture, preserving visual assets without production scripts."""
import concurrent.futures,hashlib,json,re,shutil,sys,time
from pathlib import Path
from urllib.parse import urljoin,urlsplit,unquote
import requests
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parents[1]
capture=Path(sys.argv[1]); assets=ROOT/'public/assets'; assets.mkdir(parents=True,exist_ok=True)
pages=ROOT/'src/pages';pages.mkdir(exist_ok=True)
manifest=json.loads((capture/'resources.json').read_text())
resources={u:v for u,v in manifest.items() if v['type'] in ('image','font','stylesheet','media')}
rawpages={p.stem:p.read_text() for p in (capture/'pages').glob('*.html') if re.search(r'<style[^>]*>[\s\S]{5000,}?</style>',p.read_text())}
url_pattern=re.compile(r"url\(\s*(?:\"([^\"]*)\"|'([^']*)'|([^)]*))\s*\)")
def css_urls(text):return [(a or b or c).strip() for a,b,c in url_pattern.findall(text)]
def normalize(u):return requests.utils.requote_uri(u)

needed=set()
def consider(u):
 if not u or u.startswith(('data:','blob:','#','javascript:')):return
 u=normalize(urljoin('https://www.codedex.io/',u))
 if urlsplit(u).scheme in ('http','https'):needed.add(u)
for raw in rawpages.values():
 s=BeautifulSoup(raw,'html.parser')
 for el in s.find_all(['img','source','video','audio']):
  consider(el.get('src'));consider(el.get('poster'))
  if el.get('srcset'):
   for v in el['srcset'].split(','):consider(v.strip().split(' ')[0])
 for el in s.find_all('link'):
  if any(v in el.get('rel',[]) for v in ['stylesheet','icon','apple-touch-icon']):consider(el.get('href'))
 for el in s.find_all('style'):
  for u in css_urls(el.get_text()):consider(u)
 for el in s.select('[style]'):
  for u in css_urls(el['style']):consider(u)
for u,v in list(resources.items()):
 source=capture/'resources'/v['file']
 if source.exists():shutil.copy2(source,assets/v['file'])
 if v['type']=='stylesheet' and source.exists():
  for rel in css_urls(source.read_text(errors='ignore')):consider(urljoin(u,rel))
missing=needed-set(resources)
def download(u):
 try:
  ext=Path(unquote(urlsplit(u).path)).suffix
  if not re.fullmatch(r'\.[a-zA-Z0-9]{1,6}',ext):ext='.bin'
  cached=hashlib.sha256(u.encode()).hexdigest()[:20]+ext
  if (assets/cached).exists():return (u,{'file':cached,'type':'asset','bytes':(assets/cached).stat().st_size})
  r=requests.get(u,timeout=20);r.raise_for_status()
  if len(r.content)>35_000_000:return (u,'too large')
  ext=Path(unquote(urlsplit(u).path)).suffix
  if not re.fullmatch(r'\.[a-zA-Z0-9]{1,6}',ext):ext='.bin'
  file=hashlib.sha256(u.encode()).hexdigest()[:20]+ext
  (assets/file).write_bytes(r.content)
  return (u,{'file':file,'type':'asset','bytes':len(r.content)})
 except Exception as e:return (u,str(e))
errors=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
 for u,v in pool.map(download,sorted(missing)):
  if isinstance(v,dict):resources[u]=v
  else:errors.append({'url':u,'error':v})
print('Resources',len(resources),'missing',len(errors),flush=True)
def asset_url(u,origin='https://www.codedex.io/'):
 if u.startswith(('data:','#','blob:')):return u
 absolute=normalize(urljoin(origin,u))
 if absolute not in resources and absolute.endswith('.png') and absolute[:-4]+'.webp' in resources:absolute=absolute[:-4]+'.webp'
 return '{{BASE}}/assets/'+resources[absolute]['file'] if absolute in resources else '{{BASE}}/assets/unavailable.svg'

def css_rewrite(text,origin='https://www.codedex.io/'):
 return url_pattern.sub(lambda m:'url("'+asset_url((m.group(1) or m.group(2) or m.group(3)).strip(),origin)+'")',text)
for u,v in resources.items():
 file=assets/v['file']
 if file.suffix=='.css' and file.exists():file.write_text(css_rewrite(file.read_text(errors='ignore'),u))
route_info=[]
for name,raw in rawpages.items():
 s=BeautifulSoup(raw,'html.parser'); data=json.loads((capture/'pages'/(name+'.json')).read_text());route=data['route']
 if route.count('/')>1 and data['title'] in ('Codédex Register','Codédex Club'):
  print('Skip access gate',route,flush=True);continue
 if urlsplit(data['url']).path.rstrip('/') != route.rstrip('/'):
  print('Skip redirect',route,data['url'],flush=True);continue
 for el in s.find_all('dialog'):
  parent=el.parent
  if parent.name!='body' and len(parent.find_all(recursive=False))==1:parent.decompose()
  else:el.decompose()
 for el in s.find_all(['script','iframe','noscript','base']):el.decompose()
 for el in s.find_all('link'):
  if any(v in el.get('rel',[]) for v in ['preload','prefetch','preconnect','dns-prefetch','canonical']):el.decompose()
 for img in s.find_all('img'):
  if img.get('width')=='1' or img.get('height')=='1':img.decompose()
 for el in s.find_all(True):
  for attr in list(el.attrs):
   if attr.lower().startswith('on'):del el[attr]
  for attr in ['src','poster']:
   if el.get(attr):el[attr]=asset_url(el[attr])
  if el.get('srcset'):el['srcset']=', '.join(asset_url(v.strip().split(' ')[0])+' '+' '.join(v.strip().split(' ')[1:]) for v in el['srcset'].split(','))
  if el.get('style'):el['style']=css_rewrite(el['style'])
  if el.name=='style':el.string=css_rewrite(el.get_text())
  if el.name=='link' and el.get('href'):el['href']=asset_url(el['href'])
  if el.name=='a' and el.get('href'):
   href=el['href'];parsed=urlsplit(href)
   if href.startswith('/') and not href.startswith('//') or parsed.netloc=='www.codedex.io':
    pathname=parsed.path.rstrip('/') or '/';el['data-route']=pathname
    el['href']='{{BASE}}'+pathname+('/' if pathname!='/' and not Path(pathname).suffix else '')+('?' + parsed.query if parsed.query else '')+('#'+parsed.fragment if parsed.fragment else '')
   elif parsed.scheme in ('http','https'):el['target']='_blank';el['rel']='noopener noreferrer'
 s.html['data-route']=route
 # Capture CSSOM rather than hydrated production code.
 meta=s.new_tag('meta',attrs={'name':'robots','content':'noindex,nofollow'});s.head.append(meta)
 localcss=s.new_tag('link',rel='stylesheet',href='{{BASE}}/app.css');s.head.append(localcss)
 s.body.append(s.new_tag('script',type='module',src='{{BASE}}/app.mjs'))
 for el in s.select('video'):el['preload']='none'
 # Remove the external availability warning from the standalone local profile form.
 if route in ('/signup','/login'):
  for el in s.find_all(['p','h2','h3']):
   if 'Limited Availability in Your Region' in el.get_text():
    container=el.parent
    if len(container.get_text())<1500:container.decompose()
    break
 (pages/(name+'.html')).write_text(str(s))
 route_info.append({'route':route,'file':name+'.html','title':data['title'],'source':'https://www.codedex.io'+route})
(ROOT/'src/routes.json').write_text(json.dumps(sorted(route_info,key=lambda x:x['route']),indent=2))
(ROOT/'docs/asset-provenance.json').write_text(json.dumps([{'file':'assets/'+v['file'],'source':u.split('?')[0],'bytes':v['bytes']} for u,v in resources.items()],indent=2))
(ROOT/'docs/capture-errors.json').write_text(json.dumps(errors,indent=2))
print('Imported',len(route_info),'pages',flush=True)
