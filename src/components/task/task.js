import React from 'react'
// import Label from '../label'

import './task.css'

function Task({ description, timeCreated, checked, onDeleted, onCompleted }) {
  return (
    <div className="view">
      <input type="checkbox" className="toggle" onClick={onCompleted} checked={checked} />
      <label htmlFor="taskText">
        <span className="description">{description}</span>
        <span className="created">{timeCreated}</span>
      </label>
      <button className="icon icon-edit" type="button" aria-label="Edit" />
      <button className="icon icon-destroy" type="button" aria-label="Destroy" onClick={onDeleted} />
    </div>
  )
}

export default Task
