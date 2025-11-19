import { useEffect, useState } from 'react'
import { apiPost } from '../utils/api'
import TipidModal from './TipidModal'

export default function PostItem({ user }){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('food')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('pcs')
  const [photo_url, setPhotoUrl] = useState('')
  const [coords, setCoords] = useState(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [aiData, setAiData] = useState(null)

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (pos)=> setCoords({lat: pos.coords.latitude, lng: pos.coords.longitude}),
      ()=> setCoords({lat: 14.5995, lng: 120.9842})
    )
  },[])

  async function onSubmit(e){
    e.preventDefault()
    // Step 3: AI Check first
    const ai = await apiPost('/api/ai/tipid', { title, description, category })
    setAiData(ai)
    setModalOpen(true)
  }

  async function handleModalClose(action){
    setModalOpen(false)
    if(action === 'proceed' && coords){
      const body = { user_id: user?.id || 'guest', title, description, category, quantity: parseFloat(quantity)||1, unit, photo_url, location_lat: coords.lat, location_lng: coords.lng }
      const item = await apiPost('/api/items', body)
      alert('Posted!')
      setTitle(''); setDescription(''); setQuantity(''); setUnit('pcs'); setPhotoUrl('')
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-[#0c3b2e] mb-4">Post an Item</h2>
      <form onSubmit={onSubmit} className="bg-white rounded-xl border border-[#6d9774]/40 p-4 space-y-3">
        <input value={title} onChange={e=>setTitle(e.target.value)} required placeholder="Title (e.g., Bananas - ripe)" className="w-full px-3 py-2 rounded border border-[#6d9774]/50" />
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full px-3 py-2 rounded border border-[#6d9774]/50" />
        <div className="grid grid-cols-3 gap-2">
          <select value={category} onChange={e=>setCategory(e.target.value)} className="px-3 py-2 rounded border border-[#6d9774]/50">
            <option value="food">Food</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
          <input value={quantity} onChange={e=>setQuantity(e.target.value)} placeholder="Qty" className="px-3 py-2 rounded border border-[#6d9774]/50" />
          <select value={unit} onChange={e=>setUnit(e.target.value)} className="px-3 py-2 rounded border border-[#6d9774]/50">
            <option>pcs</option>
            <option>kg</option>
            <option>g</option>
            <option>pack</option>
          </select>
        </div>
        <input value={photo_url} onChange={e=>setPhotoUrl(e.target.value)} placeholder="Photo URL (optional)" className="w-full px-3 py-2 rounded border border-[#6d9774]/50" />
        <button type="submit" className="px-4 py-2 rounded bg-[#b46618] text-white">Create Post</button>
      </form>

      <TipidModal open={modalOpen} onClose={handleModalClose} data={aiData} />
    </div>
  )
}
