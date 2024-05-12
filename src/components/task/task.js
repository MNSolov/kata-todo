import React from 'react'
// import Label from '../label'

import './task.css'

function Task({ description, timeCreated }) {
  return (
    <div className="view">
      <input className="toggle" type="chekbox" />
      <label htmlFor="taskText">
        <span className="description">{description}</span>
        <span className="created">{timeCreated}</span>
      </label>
      <button className="icon icon-edit" type="button" aria-label="Edit" />
      <button className="icon icon-destroy" type="button" aria-label="Destroy" />
    </div>
  )
}

export default Task
