import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [email,setEmail]=useState('')
  const [passwd,setPasswd]=useState('')
  const navigate=useNavigate()
  const handlelogin=()=>{
    console.log("hee")
       if(email===import.meta.env.VITE_ADMIN_EMAIL  && passwd===import.meta.env.VITE_ADMIN_PASSWD)
       { 
         navigate('/services')
       }
       else
       {
           setEmail('')
           setPasswd('')
           alert('wrong credentials')
       }

  }
  return (

    <div style={{
      backgroundColor: '#111827',
      width: '100vw',
      height: '100vh',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: '#1f2937',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.4)',
        textAlign: 'center',
        minWidth: '300px'
      }}>
        <h1 style={{ marginBottom: '1.5rem', fontSize: '1.8rem', color: '#f9fafb' }}>Admin Login</h1>
        <form onSubmit={handlelogin}>
        <label htmlFor="email" style={{ display: 'block', textAlign: 'left', marginBottom: '0.5rem' }}>Email</label>
        <input
          placeholder='Enter Email'
          id="email"
          type="email"
          value={email}
          required
          onChange={(e)=>setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '8px',
            border: '1px solid #374151',
            outline: 'none',
            marginBottom: '1rem',
            backgroundColor: '#111827',
            color: 'white'
          }}
        />

        <label htmlFor="passwd" style={{ display: 'block', textAlign: 'left', marginBottom: '0.5rem' }}>Password</label>
        <input
          id="passwd"
          type="password"
          placeholder='Enter Password'
          value={passwd}
          required
          onChange={(e)=>setPasswd(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '8px',
            border: '1px solid #374151',
            outline: 'none',
            marginBottom: '1.5rem',
            backgroundColor: '#111827',
            color: 'white'
          }}
        />

        <button style={{
          width: '100%',
          padding: '0.7rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#2563eb',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: '0.3s'
        }}
          onMouseOver={e => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseOut={e => e.target.style.backgroundColor = '#2563eb'}
        >
          Login
        </button>
         </form>
      </div>
    </div>
  )
}

export default Login
