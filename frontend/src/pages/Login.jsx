import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate()

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate('/dashboard')
    }catch(err){
      alert('Login failed - falling back to guest')
      const guest = { name:'Guest', email:'guest@local', token:'guest' }
      localStorage.setItem('userInfo', JSON.stringify(guest))
      navigate('/dashboard')
    }
  }

  const guestLogin = async ()=>{
    try{
      const { data } = await api.post('/auth/guest')
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate('/dashboard')
    }catch(err){
      const guest = { name:'Guest', email:'guest@local', token:'guest' }
      localStorage.setItem('userInfo', JSON.stringify(guest))
      navigate('/dashboard')
    }
  }

  return (
    <div className="page-center">
      <div className="card glass">
        <h1>Modern Countdown</h1>
        <p className="muted">Stylish countdowns for your upcoming events</p>
        <form onSubmit={submit} className="form">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
          <button className="btn">Sign in</button>
        </form>

        <div style={{display:'flex', gap:10, marginTop:12}}>
          <button onClick={guestLogin} className="btn btn-ghost">Guest Login</button>
          <Link to="/signup" className="btn btn-outline">Sign up</Link>
        </div>
      </div>
    </div>
  )
}
