export function selectRecords(records, filters) {
 return records.filter(r => ['season','noc','sport'].every(key => !filters[key] || filters[key] === 'All' || r[key] === filters[key]));
}
export function summarize(records) {
 const years=new Map(), nations=new Map(), athletes=new Set();
 const medals={Gold:0,Silver:0,Bronze:0};
 for (const r of records) {
  athletes.add(r.id);
  years.set(r.year,(years.get(r.year)||0)+1);
  nations.set(r.noc,(nations.get(r.noc)||0)+1);
  if (r.medal in medals) medals[r.medal]++;
 }
 return {total:records.length,athletes:athletes.size,medals,
  timeline:[...years].sort((a,b)=>a[0]-b[0]),
  nations:[...nations].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]))};
}
