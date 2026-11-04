"""Small maintenance check: validate the catalog graph and local asset paths."""
import json
from pathlib import Path
from urllib.parse import urlparse, parse_qs

root = Path(__file__).resolve().parents[1]
catalog = json.loads((root / 'content/catalog.json').read_text())
islands = json.loads((root / 'content/islands.json').read_text())
media = json.loads((root / 'content/media.json').read_text())
resources = catalog['resources']
ids = {r['id'] for r in resources}
terms = {t['id'] for t in catalog['glossary']}
island_ids = {i['id'] for i in islands}
assert len(ids) == len(resources), 'Duplicate resource IDs'
for r in resources:
    assert r['island'] in island_ids, r['id']
    assert r['title'] and r['summary'] and r['learn'], r['id']
    assert r['type'] in {'paper','repo','dataset','simulator','benchmark','frontier'}, r['id']
    for key in ['prerequisites', 'related']:
        assert set(r.get(key, [])) <= ids, (r['id'], key)
    assert set(r.get('terms', [])) <= terms, (r['id'], 'terms')
    if r.get('aliasOf'):
        assert r['aliasOf'] in ids, r['id']
    for link in r['links']:
        u = urlparse(link['url'])
        assert u.scheme == 'https' and u.netloc, (r['id'], link)
        assert not any(k.startswith('utm_') for k in parse_qs(u.query)), link
for i in islands:
    assert set(i['nodes']) <= ids, i['id']
for journey in catalog['journeys']:
    assert set(journey['nodes']) <= ids, journey['id']
for id, m in media.items():
    assert id in ids, id
    for kind in ['image','video']:
        if m.get(kind):
            assert (root / 'public' / m[kind]).is_file(), (id, kind)
    assert m['credit'] and m['source'] and m['alt'], id
print(f"Catalog OK: {len(resources)} resources, {len(islands)} regions, {len(catalog['journeys'])} journeys, {len(terms)} terms, {len(media)} media entries")

world = json.loads((root / 'content/world.json').read_text())
atlas = json.loads((root / 'public/scene-assets/atlas.json').read_text())
assert {r['id'] for r in world['regions']} == island_ids, 'Scene/catalog region mismatch'
for region in world['regions']:
    assert all(0 <= left <= right for left, right in region['shape']), region['id']
    assert all(name in atlas['assets'] for name, *_ in region['buildings']), region['id']
    assert (root / 'public/scene-assets/codedex' / region['character']).is_file(), region['id']
for asset in atlas['assets'].values():
    assert (root / 'public' / asset['file'].lstrip('/')).is_file(), asset['file']
for edge in world['connections']:
    assert len(edge) == 2 and set(edge) <= island_ids, edge
for item in json.loads((root / 'docs/template-home-assets.json').read_text()):
    assert (root / 'public' / item['file']).is_file(), item['file']
print('Composed scene and template asset references OK')
