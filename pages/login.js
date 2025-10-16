import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: code })
    });
    if (res.ok) {
      const next = router.query.next || '/';
      router.push(next);
    } else {
      const j = await res.json().catch(()=>({}));
      setErr(j.error || 'Login failed');
    }
  }

  return (
    <div style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#0b0f14',color:'#e6eefc',fontFamily:'system-ui,Segoe UI,Roboto,Helvetica,Arial'}}>
      <form onSubmit={onSubmit} style={{background:'#121821',padding:24,border:'1px solid #243041',borderRadius:12,width:360}}>
        <h1 style={{marginTop:0,marginBottom:8,fontSize:22}}>🔐 Mock-Prep Planner</h1>
        <p style={{marginTop:0,opacity:.75}}>Enter passcode to continue.</p>
        <input
          autoFocus
          type="password"
          placeholder="Passcode"
          value={code}
          onChange={e=>setCode(e.target.value)}
          style={{width:'100%',padding:'10px 12px',borderRadius:8,border:'1px solid #2a3a4f',background:'#0f141c',color:'#e6eefc'}}
        />
        {err && <div style={{color:'#ff6b6b',marginTop:8}}>{err}</div>}
        <button type="submit" style={{marginTop:12,width:'100%',padding:'10px 12px',borderRadius:8,border:'1px solid #2a3a4f',background:'#1a2330',color:'white',cursor:'pointer'}}>Unlock</button>
        <div style={{marginTop:12,fontSize:12,opacity:.6}}>Tip: Change the passcode in your Vercel Environment Variables.</div>
      </form>
    </div>
  );
}