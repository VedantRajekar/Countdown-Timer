import React, { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Dashboard(){
  const [events,setEvents]=useState([])
  const [title,setTitle]=useState('')
  const [date,setDate]=useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    const u = JSON.parse(localStorage.getItem('userInfo')||'null')
    if(!u) return navigate('/')
    (async ()=>{
      try{
        const res = await api.get('/timers', { headers: { Authorization: `Bearer ${u.token}` } })
        setEvents(res.data.map(e=>({ id: e._id, title: e.title, date: e.targetDate })))
      }catch(err){
        const local = JSON.parse(localStorage.getItem('events')||'[]')
        setEvents(local)
      }
    })()
  },[])

  const addEvent = async (e)=>{
    e.preventDefault()
    const u = JSON.parse(localStorage.getItem('userInfo')||'null')
    if(!title || !date) return alert('Enter title and date')
    try{
      if(u && u.token && u.token!=='guest'){
        const res = await api.post('/timers', { title, targetDate: date }, { headers: { Authorization: `Bearer ${u.token}` } })
        setEvents(prev=>[{ id: res.data._id, title: res.data.title, date: res.data.targetDate }, ...prev])
      }else{
        const ev = { id: Date.now().toString(), title, date }
        const newE = [ev, ...events]
        setEvents(newE)
        localStorage.setItem('events', JSON.stringify(newE))
      }
      setTitle(''); setDate('')
    }catch(err){
      alert('Failed to save event')
    }
  }

  const deleteEvent = async (id)=>{
    const u = JSON.parse(localStorage.getItem('userInfo')||'null')
    try{
      if(u && u.token && u.token!=='guest'){
        await api.delete(`/timers/${id}`, { headers: { Authorization: `Bearer ${u.token}` } })
        setEvents(prev=>prev.filter(x=>x.id!==id))
      }else{
        const newE = events.filter(x=>x.id!==id); setEvents(newE); localStorage.setItem('events', JSON.stringify(newE))
      }
    }catch(err){
      alert('Delete failed')
    }
  }

  return (
    <div className="page-wrap">
      <header className="topbar glass">
        <h1>Upcoming Events</h1>
        <div>
          <button className="btn" onClick={()=>{ localStorage.removeItem('userInfo'); navigate('/') }}>Logout</button>
        </div>
      </header>

      <main className="container">
        <section className="add-form glass">
          <h3>Add Event</h3>
          <form onSubmit={addEvent} className="form-inline">
            <input placeholder="Event title" value={title} onChange={e=>setTitle(e.target.value)} />
            <input type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} />
            <button className="btn">Add</button>
          </form>
        </section>

        <section className="grid">
          {events.length===0 && <p className="muted">No upcoming events. Add one!</p>}
          {events.map(ev=> <EventCard key={ev.id} event={ev} onDelete={deleteEvent} />)}
        </section>
      </main>
    </div>
  )
}
