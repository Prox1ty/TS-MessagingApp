import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar'

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
        <Navbar  />
        <main className="flex-1 flex-col">
            <Outlet />
        </main>
    </div>
  )
}

export default Layout