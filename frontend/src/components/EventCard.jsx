import React from 'react';
import CircularTimer from './CircularTimer';
export default function EventCard({ event, onDelete }){
  return (<div className="event-card"><div className="event-meta"><h3>{event.title}</h3><p className="muted">{new Date(event.date).toLocaleString()}</p></div><div className="event-timer"><CircularTimer targetDate={event.date} onEnd={()=>{}} /></div><div style={{marginTop:8}}><button className="btn btn-danger" onClick={()=>onDelete && onDelete(event.id)}>Delete</button></div></div>);
}
