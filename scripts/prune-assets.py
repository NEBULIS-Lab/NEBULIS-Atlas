"""Remove only generated assets not referenced by the active page inventory."""
from pathlib import Path
import json,re
root=Path(__file__).resolve().parents[1]
routes=json.loads((root/'src/routes.json').read_text());used=set()
for item in routes:used.update(re.findall(r'/assets/([\w.-]+)',(root/'src/pages'/item['file']).read_text()))
queue=list(used)
while queue:
 name=queue.pop();file=root/'public/assets'/name
 if file.suffix=='.css' and file.exists():
  new=set(re.findall(r'/assets/([\w.-]+)',file.read_text()))-used;used.update(new);queue.extend(new)
removed=0;size=0
for file in (root/'public/assets').iterdir():
 if file.is_file() and file.name not in used:
  size+=file.stat().st_size;file.unlink();removed+=1
provenance=root/'docs/asset-provenance.json'
entries=json.loads(provenance.read_text());provenance.write_text(json.dumps([e for e in entries if (root/'public'/e['file']).exists()],indent=2))
print(f'Removed {removed} unreferenced assets ({size/1e6:.1f} MB)')
