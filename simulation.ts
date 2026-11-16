export type MachineMode = 'RUN' | 'STOP' | 'FAULT';
export type Snapshot = { mode:MachineMode; speed:number; current:number; temperature:number; total:number; good:number; reject:number; plannedSeconds:number; runningSeconds:number; idealCycleSeconds:number; alarm:string|null; io:boolean[]; updatedAt:string };
export function simulate(tick:number, mode:MachineMode, speed:number):Snapshot {
 const runningSeconds=mode==='RUN'?Math.round(tick*2):Math.max(0,Math.round(tick*1.35));
 const plannedSeconds=Math.max(60,tick*2);
 const total=Math.max(0,Math.floor(runningSeconds*speed/60*0.92));
 const reject=Math.floor(total*0.025);
 return {mode,speed,current:mode==='FAULT'?7.8:mode==='RUN'?Number((3.4+Math.sin(tick/3)*0.3).toFixed(2)):0,temperature:mode==='FAULT'?78:mode==='RUN'?Number((41+Math.sin(tick/7)*2).toFixed(1)):32,total,good:total-reject,reject,plannedSeconds,runningSeconds,idealCycleSeconds:60/Math.max(1,speed),alarm:mode==='FAULT'?'MOTOR_OVERCURRENT':null,io:Array.from({length:16},(_,i)=>mode==='RUN'&&(i===0||i===2||i===8||i===10)),updatedAt:new Date().toISOString()};
}
export function computeOee(s:Snapshot){const availability=s.plannedSeconds>0?Math.min(1,s.runningSeconds/s.plannedSeconds):0;const performance=s.runningSeconds>0?Math.min(1,(s.idealCycleSeconds*s.total)/s.runningSeconds):0;const quality=s.total>0?s.good/s.total:0;return {availability,performance,quality,oee:availability*performance*quality};}
