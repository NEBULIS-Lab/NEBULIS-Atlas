"""Build prefix-safe standalone pages; no network access is needed."""
import argparse,json,shutil
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--base',default='');args=p.parse_args()
base='/' + args.base.strip('/') if args.base.strip('/') else ''
root=Path(__file__).resolve().parents[1];out=root/'dist';shutil.rmtree(out,ignore_errors=True);out.mkdir(exist_ok=True)
shutil.copytree(root/'public',out,dirs_exist_ok=True)
for f in out.rglob('*.css'):f.write_text(f.read_text().replace('{{BASE}}',base))
routes=json.loads((root/'src/routes.json').read_text())
for item in routes:
 target=out/item['route'].lstrip('/')/'index.html';target.parent.mkdir(parents=True,exist_ok=True)
 html=(root/'src/pages'/item['file']).read_text().replace('{{BASE}}',base)
 html=html.replace('<head>','<head><meta name="atlas-base" content="'+base+'">')
 target.write_text(html)
for filename in ['app.mjs','state.mjs','app.css','python-worker.js','sql-worker.js']:
 shutil.copy2(root/'src'/filename,out/filename)
(out/'routes.json').write_text(json.dumps(routes))
(out/'.nojekyll').touch()
(out/'404.html').write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not captured | Atlas</title><style>body{background:#020617;color:#f1f5f9;font:18px system-ui;max-width:650px;margin:15vh auto;padding:24px}a{color:#38bdf8}</style><h1>This page is outside the local collection.</h1><p>This reconstruction includes public pages listed in the course catalog. Private services and uncaptured pages are unavailable locally.</p><a href="'+base+'/courses/">Explore the courses →</a></html>')
print(f'Built {len(routes)} pages at {out}, base={base or "/"}')
