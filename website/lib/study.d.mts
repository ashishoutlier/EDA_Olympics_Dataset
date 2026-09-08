export type RecordRow = {id:number;year:number;season:string;noc:string;sport:string;sex:string;medal:string|null};
export function selectRecords(records:RecordRow[],filters:{season:string;noc:string;sport:string}):RecordRow[];
export function summarize(records:RecordRow[]):{total:number;athletes:number;medals:Record<string,number>;timeline:[number,number][];nations:[string,number][]};
