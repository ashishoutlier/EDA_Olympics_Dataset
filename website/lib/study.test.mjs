import { test } from 'node:test';
import assert from 'node:assert/strict';
import { selectRecords, summarize } from './study.mjs';
const records = [
  {id:1,year:2000,season:'Summer',noc:'GBR',sport:'Rowing',medal:'Gold'},
  {id:1,year:2000,season:'Summer',noc:'GBR',sport:'Rowing',medal:'Gold'},
  {id:2,year:2004,season:'Summer',noc:'USA',sport:'Swimming',medal:null},
  {id:3,year:2002,season:'Winter',noc:'USA',sport:'Skiing',medal:'Silver'},
];
test('filters intersect season, sport and committee', () => {
 assert.deepEqual(selectRecords(records,{season:'Summer',noc:'USA',sport:'All'}),[records[2]]);
});
test('counts event records separately from unique athletes and medal records', () => {
 const s=summarize(records);
 assert.equal(s.athletes,3); assert.equal(s.total,4); assert.equal(s.medals.Gold,2);
 assert.deepEqual(s.timeline,[[2000,2],[2002,1],[2004,1]]);
 assert.deepEqual(s.nations,[['GBR',2],['USA',2]]);
});
test('empty selection has no phantom athletes', () => {
 assert.equal(summarize([]).athletes,0);
 assert.equal(summarize([]).total,0);
});
