import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../utils/api'

export default function Chat(){
  const [chatId, setChatId] = useState('')
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')

  async function load(){
    if(!chatId) return
    const data = await apiGet(`/api/chats/${chatId}/messages`)
    setMessages(data)
  }

  useEffect(()=>{ load() }, [chatId])

  async function send(){
    if(!chatId) return
    const msg = await apiPost(`/api/chats/${chatId}/messages`, { sender_id: 'demo', text })
    setText('')
    load()
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-[#0c3b2e] mb-4">Secure Chat</h2>
      <div className="mb-3">
        <input value={chatId} onChange={e=>setChatId(e.target.value)} placeholder="Enter Chat ID" className="px-3 py-2 rounded border border-[#6d9774]/50 w-full" />
      </div>
      <div className="bg-white border border-[#6d9774]/40 rounded-xl p-4 h-80 overflow-y-auto space-y-2">
        {messages.map(m=> (
          <div key={m.id} className={`max-w-[75%] px-3 py-2 rounded ${m.sender_id==='demo'?'bg-[#0c3b2e] text-white ml-auto':'bg-[#6d9774]/20 text-[#0c3b2e]'}`}>
            <div className="text-xs opacity-70">{m.sender_id}</div>
            <div>{m.text}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message" className="flex-1 px-3 py-2 rounded border border-[#6d9774]/50" />
        <button onClick={send} className="px-4 py-2 rounded bg-[#0c3b2e] text-white">Send</button>
      </div>
    </div>
  )
}
