import React from 'react'

import TaskList from '../task-list'
import Header from '../header'

import './app.css'

function App() {
  return (
    <section className="todoapp">
      <Header />
      <section className="main">
        <TaskList />
      </section>
    </section>
  )
}

export default App
