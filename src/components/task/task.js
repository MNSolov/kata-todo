import React, { PureComponent } from 'react'
// import Label from '../label'

import './task.css'

export default class Task extends PureComponent {
  render() {
    const { description, timeCreated, checked, onDeleted, onCompleted } = this.props

    return (
      <div className="view">
        <input type="checkbox" className="toggle" onChange={onCompleted} checked={checked} />
        <label htmlFor="taskText">
          <span className="description">{description}</span>
          <span className="created">created {timeCreated} ago</span>
        </label>
        <button className="icon icon-edit" type="button" aria-label="Edit" />
        <button className="icon icon-destroy" type="button" aria-label="Destroy" onClick={onDeleted} />
      </div>
    )
  }
}
