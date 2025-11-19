import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import Discover from './components/Discover'
import PostItem from './components/PostItem'
import Chat from './components/Chat'
import Dashboard from './components/Dashboard'
import { useState } from 'react'

function Home({ onAuthed, user }){
  return (
    <div>
      <section className="bg-[#fbfbf9]">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-[#0c3b2e] mb-3">iBigay</h1>
            <p className="text-[#0c3b2e]/80 mb-4">Don't Waste It. Give It. Pag 'di na kailangan, wag itapon! I-Bigay.</p>
            <div className="flex gap-2">
              <Link to="/post" className="px-4 py-2 rounded bg-[#b46618] text-white">Create Post</Link>
              <Link to="/" className="px-4 py-2 rounded border border-[#6d9774] text-[#0c3b2e]">Discover</Link>
            </div>
          </div>
          <div className="bg-[#6d9774]/20 rounded-xl p-6 border border-[#6d9774]/40">
            {user ? (
              <div className="text-[#0c3b2e]">Welcome, {user.name}! Ready to share?</div>
            ) : (
              <Auth onAuthed={onAuthed} />
            )}
          </div>
        </div>
      </section>
      <Discover />
    </div>
  )
}

function App(){
  const [user, setUser] = useState(null)

  return (
    <div className="min-h-screen bg-[#fbfbf9]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home user={user} onAuthed={setUser} />} />
        <Route path="/post" element={<PostItem user={user} />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </div>
  )
}

export default App
