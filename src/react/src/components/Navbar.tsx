function Navbar() {
  return (
      <nav className="w-full flex flex-row justify-between h-8 bg-zinc-950 text-white">
            <h1>Chat App</h1>

            <ul className="flex flex-row justify-between w-1/2">
                <li key="something1"><p>placeholder1</p></li>
                <li key="something2"><p>placeholder2</p></li>
                <li key="something3"><p>placeholder3</p></li>
            </ul>
        </nav>
  )
}

export default Navbar