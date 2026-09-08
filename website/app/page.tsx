'use client';
import {useMemo,useState} from 'react';
import {ArrowUpRight,RotateCcw,Activity} from 'lucide-react';
import {NativeSelect,NativeSelectOption} from '@/components/ui/native-select';
import {Table,TableHeader,TableBody,TableRow,TableHead,TableCell} from '@/components/ui/table';
import records from '@/lib/records.json';
import {selectRecords,summarize} from '@/lib/study.mjs';
const source='https://github.com/ashishoutlier/EDA_Olympics_Dataset';
const sports=[...new Set(records.map(r=>r.sport))].sort();
const nations=[...new Set(records.map(r=>r.noc))].sort();
const number=(n:number)=>n.toLocaleString('en-US');
function Filter({label,value,onChange,options}:{label:string;value:string;onChange:(v:string)=>void;options:string[]}) {
 return <label className="filter"><span>{label}</span><NativeSelect value={value} onChange={e=>onChange(e.target.value)} className="field-select">{options.map(v=><NativeSelectOption key={v} value={v}>{v==='All'?`All ${label.toLowerCase()}`:v}</NativeSelectOption>)}</NativeSelect></label>;
}
export default function Home() {
 const [season,setSeason]=useState('All'),[sport,setSport]=useState('All'),[noc,setNoc]=useState('All'),[expanded,setExpanded]=useState(false);
 const filtered=useMemo(()=>selectRecords(records,{season,sport,noc}),[season,sport,noc]);
 const summary=useMemo(()=>summarize(filtered),[filtered]);
 const maxYear=Math.max(1,...summary.timeline.map(r=>r[1]));
 const top=summary.nations.slice(0,10), maxNation=top[0]?.[1]||1;
 const reset=()=>{setSeason('All');setSport('All');setNoc('All');};
 return <><a className="skip" href="#explore">Skip to the data</a>
 <header><a className="brand" href="./"><Activity size={23}/>The Olympic Record</a><a href={source}>Project notebook <ArrowUpRight size={17}/></a></header>
 <main>
 <section className="opening"><div className="opening-inner"><div><p className="eyebrow">A study of participation · By Ashish</p><h1>Every event.<br/><span>Another story.</span></h1><p className="lede">Follow the shape of the Games through the athletes who took part. Explore the records by season, sport, and Olympic committee.</p></div><div className="archive-stamp"><strong>70,000</strong><span>athlete event records</span><p>1896 to 2016<br/>A sample from the historical archive</p></div></div></section>
 <section className="explorer" id="explore"><div className="filters"><Filter label="Seasons" value={season} onChange={setSeason} options={['All','Summer','Winter']}/><Filter label="Sports" value={sport} onChange={setSport} options={['All',...sports]}/><Filter label="Committees" value={noc} onChange={setNoc} options={['All',...nations]}/><button onClick={reset} className="reset"><RotateCcw size={15}/>Reset</button></div>
 <div className="selection-summary" aria-live="polite"><div><strong>{number(summary.total)}</strong><span>event records in view</span></div><div><strong>{number(summary.athletes)}</strong><span>distinct athlete IDs</span></div><div><strong>{summary.nations.length}</strong><span>Olympic committees</span></div><p>A row is one athlete in one event. An athlete can appear more than once.</p></div>
 {summary.total===0?<div className="empty"><h2>No records in this selection.</h2><p>Try another sport, season, or committee.</p><button onClick={reset}>Show the full sample</button></div>:<div className="chart-layout">
 <section className="timeline"><div className="section-title"><div><p>Through the years</p><h2>Participation over time</h2></div><span>{season==='All'?'Both seasons':`${season} Games`}</span></div><p className="chart-description">Event records in the selected sample, grouped by year.</p>
 <svg viewBox="0 0 830 355" role="img" aria-label="Bar chart of athlete event records by year. Exact values are in the table below.">
 {[0,.25,.5,.75,1].map(t=><g key={t}><line x1="62" y1={285-t*230} x2="812" y2={285-t*230} className="gridline"/><text x="51" y={289-t*230} textAnchor="end">{number(Math.round(maxYear*t))}</text></g>)}
 {summary.timeline.map(([year,count],i)=>{const width=744/summary.timeline.length,x=65+i*width;return <g key={year}><rect x={x} y={285-count/maxYear*230} width={Math.max(2,width-4)} height={count/maxYear*230} fill={i%2?'#1558a5':'#3978bf'}><title>{`${year}: ${number(count)} event records`}</title></rect>{(i%Math.ceil(summary.timeline.length/9)===0||i===summary.timeline.length-1)&&<text x={x+width/2} y="313" textAnchor="middle">{year}</text>}</g>;})}<text x="439" y="348" textAnchor="middle">Year of the Games</text></svg>
 <p className="caption">Changes in this sample can reflect which athletes are included. They do not establish the total size of each Games.</p></section>
 <section className="committees"><p className="small-label">Participation by committee</p><h2>Who appears most?</h2><p className="chart-description">The ten largest groups in this selection.</p><div className="ranking">{top.map(([code,count])=><div key={code}><div className="bar-label"><button onClick={()=>setNoc(code)} title={`Filter to ${code}`}>{code}<ArrowUpRight size={12}/></button><span>{number(count)}</span></div><div className="track"><div style={{width:`${count/maxNation*100}%`}}/></div></div>)}</div><p className="caption">Codes follow the source dataset, including historical committees.</p></section>
 </div>}
 <section className="medal-section"><div><p className="small-label">Recorded results</p><h2>Medals in the sample</h2><p>These count athlete event rows with a medal. Members of a winning team are separate records.</p></div><dl>{(['Gold','Silver','Bronze'] as const).map(m=><div key={m}><dt><i className={m.toLowerCase()}/>{m}</dt><dd>{number(summary.medals[m])}</dd><small>medal records</small></div>)}</dl></section>
 <section className="data-section"><div className="section-title"><div><p>Read the numbers</p><h2>Records by year</h2></div><button className="table-toggle" onClick={()=>setExpanded(!expanded)} aria-expanded={expanded}>{expanded?'Show fewer years':'Show all years'}</button></div><Table><TableHeader><TableRow><TableHead>Year</TableHead><TableHead className="numeric">Event records</TableHead><TableHead className="numeric">Share of selection</TableHead></TableRow></TableHeader><TableBody>{summary.timeline.slice(0,expanded?undefined:6).map(([year,count])=><TableRow key={year}><TableCell>{year}</TableCell><TableCell className="numeric">{number(count)}</TableCell><TableCell className="numeric">{(count/summary.total*100).toFixed(1)}%</TableCell></TableRow>)}</TableBody></Table></section>
 <aside className="method"><h2>About this archive</h2><p>This page explores the 70,000 rows committed to the project. It is a subset of the historical athlete dataset, not an official medal table or a complete record of the Games. Filters and counts are calculated from that file. Entries without a listed medal are left uncounted in the medal figures.</p><a href={`${source}/blob/main/dataset_olympics.csv`}>View the source data <ArrowUpRight size={15}/></a></aside>
 </section></main><footer><span>An independent data study by Ashish</span><a href={source}>Code and methodology <ArrowUpRight size={15}/></a></footer></>;
}
