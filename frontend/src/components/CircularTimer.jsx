import React, { useEffect, useRef, useState } from 'react';
export default function CircularTimer({ targetDate, size=160, onEnd }) {
  const [now, setNow] = useState(Date.now()); const rafRef = useRef();
  useEffect(()=>{ function tick(){ setNow(Date.now()); rafRef.current = requestAnimationFrame(tick); } rafRef.current = requestAnimationFrame(tick); return ()=> cancelAnimationFrame(rafRef.current); },[]);
  const total = Math.max(1, (new Date(targetDate)).getTime() - Date.now());
  const diff = Math.max(0, (new Date(targetDate)).getTime() - now);
  const percent = Math.max(0, Math.min(1, 1 - diff/total));
  const radius = (size/2)-12; const circumference = 2*Math.PI*radius; const dash = circumference * percent;
  useEffect(()=>{ if(diff<=0 && onEnd) onEnd(); }, [diff]);
  const minutes = Math.floor(diff/60000); const seconds = Math.floor((diff%60000)/1000); const warn = diff>0 && diff<=60000;
  return (
    <div className="ct-card" style={{width:size}}>
      <svg width={size} height={size} className="ct-svg" viewBox={`0 0 ${size} ${size}`}>
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
        <circle cx={size/2} cy={size/2} r={radius} stroke="#ffffff22" strokeWidth="10" fill="none" />
        <circle cx={size/2} cy={size/2} r={radius} stroke="url(#g1)" strokeWidth="10" fill="none" strokeDasharray={circumference} strokeDashoffset={circumference - dash} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.6s linear' }} />
      </svg>
      <div className="ct-label"><div className="ct-time" style={{color: warn? '#ff6b6b' : 'white'}}>{diff<=0 ? '00:00' : `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`}</div><div className="ct-title">{diff<=0? 'Ended' : 'Time Left'}</div></div>
    </div>
  );
}
