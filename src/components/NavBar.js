import { Link } from "gatsby"
import React from "react"

const NavBar = () => {
  return (
    <nav className="flex sm:justify-center space-x-2 my-2">
      {[
        ["Home", "/"],
        ["History", "/history"],
      ].map(([title, url]) => (
        <a
          href={url}
          className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-800 hover:text-slate-50"
        >
          {title}
        </a>
      ))}
    </nav>
  )
}

export default NavBar
