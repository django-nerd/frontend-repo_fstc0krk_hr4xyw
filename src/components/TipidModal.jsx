import { useEffect } from 'react'

export default function TipidModal({ open, onClose, data }) {
  useEffect(()=>{
    function onKey(e){ if(e.key==='Escape') onClose?.() }
    if(open) window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  },[open,onClose])

  if(!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-[#fbfbf9] rounded-xl shadow-xl max-w-lg w-full mx-4 p-6 border border-[#6d9774]/30">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#6d9774] flex items-center justify-center text-[#0c3b2e] font-bold">C</div>
          <div>
            <h3 className="text-xl font-semibold text-[#0c3b2e]">Cen-'tipid' says:</h3>
            <p className="text-sm text-[#0c3b2e]/80">Pag 'di na kailangan, wag itapon — I-Bigay o I-kusina!</p>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-[#0c3b2e] mb-2">Tipid Tips</h4>
          <ul className="list-disc pl-5 space-y-1 text-[#0c3b2e]/90">
            {data?.tips?.map((t, i)=> <li key={i}>{t}</li>)}
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="font-medium text-[#0c3b2e] mb-2">Diskarte Recipes</h4>
          <ul className="list-disc pl-5 space-y-1 text-[#0c3b2e]/90">
            {data?.recipes?.map((r, i)=> <li key={i}>{r}</li>)}
          </ul>
        </div>
        <div className="mt-6 flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded border border-[#6d9774] text-[#0c3b2e] hover:bg-[#6d9774]/10">Go Back</button>
          <button onClick={()=> onClose('proceed')} className="px-4 py-2 rounded bg-[#b46618] text-white">Proceed to Post</button>
        </div>
      </div>
    </div>
  )
}
