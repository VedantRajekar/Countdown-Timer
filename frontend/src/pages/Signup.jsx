import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Signup(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate()

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const { data } = await api.post('/auth/signup',{ name, email, password })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate('/dashboard')
    }catch(err){
      alert('Signup failed - created local guest')
      const guest = { name:'Guest', email:'guest@local', token:'guest' }
      localStorage.setItem('userInfo', JSON.stringify(guest))
      navigate('/dashboard')
    }
  }

  return (
    <div className="page-center">
      <div className="card glass">
        <h2>Create account</h2>
        <form onSubmit={submit} className="form">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
          <button className="btn">Create</button>
        </form>
      </div>
    </div>
  )
}
