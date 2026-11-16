"use client";
import {useEffect,useMemo,useState} from 'react';
import {computeOee,simulate,type MachineMode} from '../lib/simulation';
export default function Page(){
 const [tick,setTick]=useState(30);const [mode,setMode]=useState<MachineMode>('RUN');const [speed,setSpeed]=useState(70);const [overrides,setOverrides]=useState<Record<number,boolean>>({});
 useEffect(()=>{const id=setInterval(()=>setTick(t=>t+1),2000);return()=>clearInterval(id)},[]);
 const s=useMemo(()=>simulate(tick,mode,speed),[tick,mode,speed]);const o=computeOee(s);const pct=(x:number)=>(x*100).toFixed(1)+'%';
 const io=s.io.map((v,i)=>overrides[i]??v);
 return <main><header><div><small>UNIFIED SMART MAINTENANCE / SIMULATION</small><h1>Machine 01 · Digital Twin</h1><p>Mitsubishi FX5U-style simulator · ไม่มีการเชื่อม PLC จริง</p></div><strong className={'status '+mode.toLowerCase()}>{mode}</strong></header>
 <section className="cards">{[['OEE',pct(o.oee)],['Motor Current',s.current+' A'],['Motor Temperature',s.temperature+' °C'],['Production',s.total+' pcs'],['Good',s.good+' pcs'],['Reject',s.reject+' pcs']].map(([k,v])=><article key={k}><span>{k}</span><b>{v}</b></article>)}</section>
 <section className="panel"><h2>Machine simulation</h2><div className="buttons"><button onClick={()=>setMode('RUN')}>Start</button><button onClick={()=>setMode('STOP')}>Stop</button><button className="danger" onClick={()=>setMode('FAULT')}>Trigger Alarm</button><button onClick={()=>setMode('STOP')}>Reset / Stop</button></div><label>Production rate: {speed} pcs/min <input type="range" min="10" max="100" step="5" value={speed} onChange={e=>setSpeed(Number(e.target.value))}/></label></section>
 <section className="panel"><h2>PLC I/O (click to simulate)</h2><div className="io">{io.map((v,i)=><button key={i} className={v?'on':''} onClick={()=>setOverrides(a=>({...a,[i]:!io[i]}))}>{i<8?'X'+i:'Y'+(i-8)}<span>{v?'ON':'OFF'}</span></button>)}</div></section>
 <section className="panel"><h2>OEE breakdown</h2><p>Availability: {pct(o.availability)} · Performance: {pct(o.performance)} · Quality: {pct(o.quality)}</p><h2>Alarm</h2><p>{s.alarm??'No active alarm'} · <small>Timestamp: {s.updatedAt}</small></p></section><footer>Demo data only · No Supabase write · No PLC control · No deployment</footer></main>
}
