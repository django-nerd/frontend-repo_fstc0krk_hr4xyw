import { useState } from 'react'

export default function Auth({ onAuthed }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function register(){
    try{
      setLoading(true); setError('')
      const res = await fetch((import.meta.env.VITE_BACKEND_URL||`${window.location.origin.replace('3000','8000')}`)+ '/api/auth/register', {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name, email})
      })
      if(!res.ok){ throw new Error(await res.text()) }
      const data = await res.json()
      onAuthed?.(data)
    }catch(e){ setError(e.message) } finally{ setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto bg-[#fbfbf9] border border-[#6d9774]/40 rounded-xl p-6 shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#6d9774] grid place-items-center text-[#0c3b2e] font-bold">C</div>
        <div>
          <h2 className="text-2xl font-semibold text-[#0c3b2e]">Welcome to iBigay</h2>
          <p className="text-[#0c3b2e]/80 text-sm">Cen-'tipid' is here to help you save and share.</p>
        </div>
      </div>
      <div className="space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full px-3 py-2 rounded border border-[#6d9774]/50 focus:outline-none" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded border border-[#6d9774]/50 focus:outline-none" />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button disabled={loading} onClick={register} className="w-full px-4 py-2 rounded bg-[#0c3b2e] text-[#fbfbf9] hover:opacity-90">{loading? 'Creating...':'Create Account'}</button>
      </div>
    </div>
  )
}
