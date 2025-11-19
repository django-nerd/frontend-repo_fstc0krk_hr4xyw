import { useEffect, useState } from 'react'
import { apiGet } from '../utils/api'

export default function Dashboard({ user }){
  const [stats, setStats] = useState(null)

  useEffect(()=>{
    async function load(){
      if(!user) return
      const data = await apiGet(`/api/users/${user.id}/stats`)
      setStats(data)
    }
    load()
  }, [user])

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-[#0c3b2e] mb-4">Your Impact</h2>
      {!stats ? (
        <div className="text-[#0c3b2e]/70">No data yet. Post an item to get started.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-[#6d9774]/40 p-4">
            <div className="text-sm text-[#0c3b2e]/70">Items Shared</div>
            <div className="text-3xl font-bold text-[#0c3b2e]">{stats.items_shared}</div>
          </div>
          <div className="bg-white rounded-xl border border-[#6d9774]/40 p-4">
            <div className="text-sm text-[#0c3b2e]/70">People Helped</div>
            <div className="text-3xl font-bold text-[#0c3b2e]">{stats.people_helped}</div>
          </div>
          <div className="bg-white rounded-xl border border-[#6d9774]/40 p-4">
            <div className="text-sm text-[#0c3b2e]/70">Kg Diverted</div>
            <div className="text-3xl font-bold text-[#0c3b2e]">{stats.kilograms_diverted}</div>
          </div>
        </div>
      )}
    </div>
  )
}
