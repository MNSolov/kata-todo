import React from 'react'

import './label.css'

function Label({ description, timeCreated }) {
  return (
    <label htmlFor="taskText">
      <span className="description">{description}</span>
      <span className="created">{timeCreated}</span>
    </label>
  )
}

export default Label
