import { useEffect, useState } from 'react'
import { apiGet } from '../utils/api'

export default function Discover(){
  const [coords, setCoords] = useState(null)
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (pos)=> setCoords({lat: pos.coords.latitude, lng: pos.coords.longitude}),
      ()=> setCoords({lat: 14.5995, lng: 120.9842}) // Manila fallback
    )
  },[])

  useEffect(()=>{
    async function load(){
      if(!coords) return
      try{
        const data = await apiGet('/api/items', { lat: coords.lat, lng: coords.lng, radius_km: 2 })
        setItems(data)
      }catch(e){ setError('Failed to fetch nearby items') }
    }
    load()
  }, [coords])

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-[#0c3b2e] mb-4">Nearby Items</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((it)=> (
          <div key={it.id} className="bg-white rounded-lg border border-[#6d9774]/40 p-4">
            <div className="h-40 bg-[#6d9774]/20 rounded mb-3 overflow-hidden">
              {it.photo_url ? <img src={it.photo_url} alt="" className="w-full h-full object-cover"/> : <div className="w-full h-full grid place-items-center text-[#6d9774]">No Photo</div>}
            </div>
            <h3 className="font-semibold text-[#0c3b2e]">{it.title}</h3>
            <p className="text-sm text-[#0c3b2e]/80 line-clamp-2">{it.description}</p>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-[#0c3b2e]/70">{it.distance_km} km</span>
              <button className="px-3 py-1 rounded bg-[#b46618] text-white">Claim Item</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
