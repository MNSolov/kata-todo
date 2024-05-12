import React from 'react'

import TaskFilter from '../task-filter'

import './footer.css'

function Footer() {
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <TaskFilter />
      <button className="clear-completed" type="button">
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
