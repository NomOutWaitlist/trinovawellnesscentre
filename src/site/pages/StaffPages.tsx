import { useEffect, useState, type ReactNode } from 'react';
import { Link, useNavigate, useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LockKeyhole, LogOut, Play, Square, Save, Download, RefreshCw, Clock, ClipboardList, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TrinovaLogo } from '@/site/components/TrinovaLogo';
import { staffLogin, staffLogout, saveWorkEntry, getWorkEntries } from '@/lib/work-tracker.functions';
import { PILLARS, calculateMinutes, durationLabel, csvForEntries, localDate, type StaffRole } from '@/lib/work-tracker';

function errorText(error: unknown) { return error instanceof Error ? error.message : 'Something went wrong. Please try again.'; }
function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="grid gap-2 text-sm font-semibold">{label}{children}</label>; }
function StaffShell({ title, role, children }: { title: string; role: StaffRole; children: ReactNode }) {
  const logout = useServerFn(staffLogout); const navigate = useNavigate(); const queryClient = useQueryClient(); const router = useRouter();
  const [error, setError] = useState('');
  return <div className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5"><TrinovaLogo size="sm"/><div className="flex items-center gap-3"><span className="text-sm text-muted-foreground capitalize">{role}</span><Button variant="ghost" onClick={async () => { try { await queryClient.cancelQueries(); queryClient.clear(); await logout(); await navigate({ to:'/staff', replace:true }); await router.invalidate(); } catch(e) { setError(errorText(e)); } }}><LogOut/>Sign out</Button></div></div></header>
    <main className="mx-auto max-w-6xl px-5 py-10"><div className="mb-8 flex items-center gap-3"><span className="text-leaf-green"><ClipboardList className="size-7"/></span><h1 className="text-2xl sm:text-3xl font-bold">{title}</h1></div>{error && <p role="alert" className="mb-4 text-destructive">{error}</p>}{children}</main>
  </div>;
}

export function StaffLoginPage() {
  const [role, setRole] = useState<StaffRole>('employee'); const [pin, setPin] = useState(''); const [error,setError]=useState(''); const [busy,setBusy]=useState(false);
  const login=useServerFn(staffLogin); const navigate=useNavigate(); const router=useRouter();
  return <div className="flex min-h-screen items-center justify-center px-5 py-12"><div className="w-full max-w-sm"><TrinovaLogo size="md"/><div className="mt-10 mb-6 flex items-center gap-3"><LockKeyhole className="text-leaf-green"/><h1 className="text-2xl font-bold">Staff access</h1></div><div className="mb-6 grid grid-cols-2 gap-2">{(['employee','owner'] as const).map(r=><Button key={r} variant={r===role?'default':'outline'} className="capitalize" onClick={()=>{setRole(r);setError('');setPin('');}}>{r}</Button>)}</div><form className="grid gap-5" onSubmit={async e=>{e.preventDefault();setBusy(true);setError('');try{const result=await login({data:{role,pin}});setPin('');if(!result.ok){setError(result.error);return;}await router.invalidate();await navigate({to:result.role==='owner'?'/staff/reports':'/staff/log'});}catch(e){setError(errorText(e));}finally{setBusy(false);}}}><Field label="PIN"><Input aria-label="PIN" type="password" inputMode="numeric" autoComplete="current-password" value={pin} onChange={e=>setPin(e.target.value)} required minLength={4} maxLength={128}/></Field>{error&&<p role="alert" className="text-sm text-destructive">{error}</p>}<Button type="submit" size="lg" disabled={busy}>{busy?'Checking…':'Unlock'}<ArrowRight/></Button></form></div></div>;
}

export function StaffLogPage() {
  const save=useServerFn(saveWorkEntry);
  const [date,setDate]=useState(''); const [pillar,setPillar]=useState<(typeof PILLARS)[number]>(PILLARS[0]); const [category,setCategory]=useState(''); const [description,setDescription]=useState(''); const [start,setStart]=useState(''); const [end,setEnd]=useState(''); const [running,setRunning]=useState(false); const [now,setNow]=useState(Date.now()); const [busy,setBusy]=useState(false); const [error,setError]=useState(''); const [message,setMessage]=useState(''); const [id,setId]=useState('');
  useEffect(()=>{setDate(localDate());setId(crypto.randomUUID());},[]);
  useEffect(()=>{if(!running)return;const interval=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(interval);},[running]);
  const time=()=>new Date().toTimeString().slice(0,5);
  let minutes=0;try{if(start&&end)minutes=calculateMinutes(start,end);}catch{/* error shown on submit */}
  const liveMinutes=running&&start?Math.max(0,Math.floor((now-new Date(`${date}T${start}`).getTime())/60000)):minutes;
  return <StaffShell title="Daily work log" role="employee"><form className="grid max-w-3xl gap-7" onSubmit={async e=>{e.preventDefault();setError('');setMessage('');setBusy(true);try{calculateMinutes(start,end);const result=await save({data:{id,date,pillar,category,description,start,end}});setMessage(`Saved to the private sheet · ${durationLabel(result.minutes)}`);setId(crypto.randomUUID());setDescription('');setStart('');setEnd('');setRunning(false);}catch(e){setError(errorText(e));}finally{setBusy(false);}}}>
    <div className="grid gap-5 sm:grid-cols-2"><Field label="Work date"><Input type="date" value={date} onChange={e=>setDate(e.target.value)} required disabled={running||busy}/></Field><Field label="Pillar"><select className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={pillar} onChange={e=>setPillar(e.target.value as (typeof PILLARS)[number])} disabled={busy}>{PILLARS.map(p=><option key={p}>{p}</option>)}</select></Field></div>
    <Field label="Category"><Input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} required maxLength={120} disabled={busy}/></Field><Field label="What work did you do?"><Textarea className="min-h-32" value={description} onChange={e=>setDescription(e.target.value)} required maxLength={3000} disabled={busy}/></Field>
    <section className="border-y border-border py-6"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><Clock className="text-leaf-green"/><span className="text-2xl font-bold tabular-nums">{durationLabel(liveMinutes)}</span></div><Button type="button" variant={running?'secondary':'outline'} disabled={busy||(!running&&(!category.trim()||!description.trim()))} onClick={()=>{if(running){setEnd(time());setRunning(false);}else{setDate(localDate());setStart(time());setEnd('');setRunning(true);setNow(Date.now());}setMessage('');}}>{running?<><Square/>Stop timer</>:<><Play/>Start now</>}</Button></div><div className="grid grid-cols-2 gap-5"><Field label="Start time"><Input type="time" value={start} onChange={e=>setStart(e.target.value)} required disabled={running||busy}/></Field><Field label="End time"><Input type="time" value={end} onChange={e=>setEnd(e.target.value)} required disabled={running||busy}/></Field></div></section>
    {error&&<p role="alert" className="text-sm text-destructive">{error}</p>}{message&&<p role="status" className="text-sm text-wellness-deep-green">{message}</p>}<Button className="justify-self-start" type="submit" size="lg" disabled={busy||running}><Save/>{busy?'Saving…':'Save work entry'}</Button>
  </form></StaffShell>;
}

export function StaffReportsPage() {
  const getEntries=useServerFn(getWorkEntries);
  const { data, error, isPending, isFetching, refetch }=useQuery({queryKey:['staff-work-entries'],queryFn:()=>getEntries(),refetchOnWindowFocus:true});
  const [from,setFrom]=useState('');const [to,setTo]=useState('');const [pillar,setPillar]=useState('all');const [category,setCategory]=useState('');
  const entries=(data?.entries??[]).filter(e=>(!from||e.date>=from)&&(!to||e.date<=to)&&(pillar==='all'||e.pillar===pillar)&&(!category||e.category.toLowerCase().includes(category.toLowerCase()))).sort((a,b)=>`${b.date} ${b.start}`.localeCompare(`${a.date} ${a.start}`));
  const total=entries.reduce((sum,e)=>sum+e.minutes,0);
  return <StaffShell title="Work overview" role="owner"><div className="mb-8 flex flex-wrap gap-3"><Button variant="outline" disabled={isFetching} onClick={()=>void refetch()}><RefreshCw/>{isFetching?'Refreshing…':'Refresh'}</Button><Button variant="outline" disabled={!entries.length} onClick={()=>{const url=URL.createObjectURL(new Blob([csvForEntries(entries)],{type:'text/csv;charset=utf-8;'}));const a=document.createElement('a');a.href=url;a.download='trinova-work-report.csv';a.click();URL.revokeObjectURL(url);}}><Download/>Export CSV</Button></div>
    <section className="grid gap-6 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-sm text-muted-foreground">Total logged time</p><p className="mt-2 text-3xl font-bold tabular-nums">{durationLabel(total)}</p></div>{PILLARS.map(p=><div key={p}><p className="text-sm text-muted-foreground">{p}</p><p className="mt-2 text-2xl font-semibold tabular-nums">{durationLabel(entries.filter(e=>e.pillar===p).reduce((sum,e)=>sum+e.minutes,0))}</p></div>)}</section>
    <div className="my-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Field label="From"><Input type="date" value={from} onChange={e=>setFrom(e.target.value)}/></Field><Field label="To"><Input type="date" value={to} min={from} onChange={e=>setTo(e.target.value)}/></Field><Field label="Pillar"><select className="h-9 rounded-md border border-input bg-background px-3 text-sm" value={pillar} onChange={e=>setPillar(e.target.value)}><option value="all">All pillars</option>{PILLARS.map(p=><option key={p}>{p}</option>)}</select></Field><Field label="Category"><Input value={category} onChange={e=>setCategory(e.target.value)} placeholder="All categories"/></Field></div>
    {error?<p role="alert" className="text-destructive">{errorText(error)}</p>:isPending?<p className="py-12 text-muted-foreground">Loading work entries…</p>:!entries.length?<p className="border-t border-border py-12 text-center text-muted-foreground">No work entries for this selection.</p>:<div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-border bg-muted"><tr>{['Date','Pillar / Category','Time','Duration','Work completed'].map(h=><th className="px-4 py-3 font-semibold" key={h}>{h}</th>)}</tr></thead><tbody>{entries.map(e=><tr key={e.id} className="border-b border-border"><td className="whitespace-nowrap px-4 py-4">{e.date}</td><td className="px-4 py-4"><div className="font-semibold">{e.pillar}</div><div className="mt-1 text-muted-foreground">{e.category}</div></td><td className="whitespace-nowrap px-4 py-4 tabular-nums">{e.start}–{e.end}</td><td className="whitespace-nowrap px-4 py-4 font-semibold">{durationLabel(e.minutes)}</td><td className="min-w-56 max-w-md whitespace-pre-wrap break-words px-4 py-4">{e.description}</td></tr>)}</tbody></table></div>}
    <div className="mt-8 text-sm text-muted-foreground">{entries.length} {entries.length===1?'entry':'entries'}</div>
  </StaffShell>;
}
