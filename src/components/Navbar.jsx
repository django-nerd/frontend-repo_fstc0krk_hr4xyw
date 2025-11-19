import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-[#0c3b2e] text-[#fbfbf9] sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl tracking-tight">iBigay</Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/" className={({isActive})=>`px-3 py-1 rounded ${isActive? 'bg-[#6d9774] text-[#0c3b2e]':'hover:underline'}`}>Discover</NavLink>
          <NavLink to="/post" className={({isActive})=>`px-3 py-1 rounded ${isActive? 'bg-[#6d9774] text-[#0c3b2e]':'hover:underline'}`}>Post</NavLink>
          <NavLink to="/chat" className={({isActive})=>`px-3 py-1 rounded ${isActive? 'bg-[#6d9774] text-[#0c3b2e]':'hover:underline'}`}>Chat</NavLink>
          <NavLink to="/dashboard" className={({isActive})=>`px-3 py-1 rounded ${isActive? 'bg-[#6d9774] text-[#0c3b2e]':'hover:underline'}`}>Dashboard</NavLink>
          <a href="#" className="ml-2 px-3 py-1 rounded bg-[#b46618] text-white">B2B Dashboard</a>
        </nav>
      </div>
    </header>
  )
}
