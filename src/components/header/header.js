import React from 'react'

import './header.css'

function Header() {
  return (
    <header>
      <h1>Todos</h1>
      <input className="new-todo" placeholder="What needs to be done?" />
    </header>
  )
}

export default Header
