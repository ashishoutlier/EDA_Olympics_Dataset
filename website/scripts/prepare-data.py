"""Convert the repository's athlete CSV into the fields used by the website."""
from pathlib import Path
import csv
import json
import sys

root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1]) if len(sys.argv) > 1 else root.parent / 'dataset_olympics.csv'
with source.open() as file:
    records = [dict(id=int(r['ID']), year=int(r['Year']), season=r['Season'],
                    noc=r['NOC'], sport=r['Sport'], sex=r['Sex'], medal=r['Medal'] or None)
               for r in csv.DictReader(file)]
(root / 'lib/records.json').write_text(json.dumps(records, separators=(',', ':')))
print(f'Prepared {len(records):,} athlete event records.')
