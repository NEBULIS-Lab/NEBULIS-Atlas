"""Build the static atlas. No network, framework or runtime dependencies."""
import argparse
import json
import shutil
from pathlib import Path
parser = argparse.ArgumentParser()
parser.add_argument('--base', default='', help='Repository path, for example /NEBULIS-Atlas')
parser.add_argument('--out', choices=['dist', 'dist-pages'], default='dist')
args = parser.parse_args()
base = '/' + args.base.strip('/') if args.base.strip('/') else ''
root = Path(__file__).resolve().parents[1]
out = root / args.out
shutil.rmtree(out, ignore_errors=True)
out.mkdir()
for folder in ['atlas', 'research-media']:
    shutil.copytree(root / 'public' / folder, out / folder)
for name in ['app.mjs', 'style.css']:
    shutil.copy2(root / 'src' / 'atlas' / name, out / 'atlas' / name)
shutil.copytree(root / 'content', out / 'content')
html = (root / 'src' / 'atlas' / 'index.html').read_text().replace('{{BASE}}', base)
(out / 'index.html').write_text(html)
(out / '.nojekyll').touch()
(out / '404.html').write_text('''<!doctype html><html lang="zh-CN"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Uncharted waters | NEBULIS</title>
<style>body{background:#101321;color:#eeeef5;font:16px/1.8 system-ui;max-width:600px;margin:18vh auto;padding:25px}a{color:#b6e993}</style>
<h1>Uncharted waters.</h1><p>这个地址还没有出现在地图上。</p><a href="''' + base + '''/">返回 NEBULIS 世界地图 →</a></html>''')
catalog = json.loads((root / 'content' / 'catalog.json').read_text())
size = sum(f.stat().st_size for f in out.rglob('*') if f.is_file())
print(f"Built {len(catalog['resources'])} resources, {len(catalog['journeys'])} learning paths; {size/1024/1024:.1f} MiB; base={base or '/'}")
