import React from 'react'

import TaskList from '../task-list'
import Header from '../header'
import Footer from '../footer/footer'

import './app.css'

const taskList = [
  {
    id: 1,
    typeTask: 'completed',
    description: 'Complited task',
    timeCreated: '12 min ago',
  },
  {
    id: 2,
    typeTask: 'editing',
    description: 'Edited task',
    timeCreated: '12 min ago',
  },
  {
    id: 3,
    typeTask: '',
    description: 'Active task',
    timeCreated: '12 min ago',
  },
]

function App() {
  return (
    <section className="todoapp">
      <Header />
      <section className="main">
        <TaskList taskList={taskList} />
        <Footer />
      </section>
    </section>
  )
}

export default App
