import React from 'react'

import './task-filter.css'

function TaskFilter() {
  return (
    <ul className="filters">
      <li>
        <button className="selected" type="button">
          All
        </button>
      </li>
      <li>
        <button type="button">Active</button>
      </li>
      <li>
        <button type="button">Completed</button>
      </li>
    </ul>
  )
}

export default TaskFilter
