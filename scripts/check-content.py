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
