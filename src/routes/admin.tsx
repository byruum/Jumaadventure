import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'

// YOUR REAL KEYS - UPDATED
const SUPABASE_URL = 'https://ezkejiawykqfxllvbzjm.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a2VqaWF3eWtxZnhsbHZiemptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNDIyMjcsImV4cCI6MjEwMDcxODIyN30.R9IsjDcaBNtoHjCa8qpFxcQwREG3wJA93oX2ObPmPeI'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export const Route = createFileRoute('/admin')({
  component: Admin,
})

export default function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  async function login() {
    setLoading(true)
    setStatus('')
    const { error, data } = await supabase.auth.signInWithPassword({ email, password })
    if(error) setStatus(error.message)
    else setUser(data.user)
    setLoading(false)
  }

  async function upload() {
    if(!file) return setStatus('Pick a file first')
    setLoading(true)
    setStatus('Uploading...')
    const fileName = Date.now() + '-' + file.name
    const { error } = await supabase.storage.from('gallery').upload(fileName, file)
    if(error) setStatus('Error: ' + error.message)
    else setStatus('Uploaded successfully!')
    setLoading(false)
  }

  async function logout() {
    await supabase.auth.signOut()
    setUser(null)
    setEmail('')
    setPassword('')
  }

  if(!user) {
    return (
      <div style={{padding: 40, maxWidth: 400, margin: 'auto'}}>
        <h2>Admin Login - Juma Adventures</h2>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{width:'100%', padding:10, margin:'10px 0'}} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{width:'100%', padding:10, margin:'10px 0'}} />
        <button onClick={login} disabled={loading} style={{width:'100%', padding:10, background:'#ff6b35', color:'white', border:'none'}}>
          {loading? 'Logging in...' : 'Login'}
        </button>
        <p style={{color:'red'}}>{status}</p>
      </div>
    )
  }

  return (
    <div style={{padding: 40, maxWidth: 600, margin: 'auto'}}>
      <h2>Upload Safari Photo</h2>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={upload} disabled={loading} style={{padding:10, background:'#ff6b35', color:'white', border:'none', margin:'10px'}}>
        {loading? 'Uploading...' : 'Upload'}
      </button>
      <button onClick={logout} style={{padding:10}}>Logout</button>
      <p>{status}</p>
    </div>
  )
}
