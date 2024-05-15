import React, { PureComponent } from 'react'

import './task.css'

export default class Task extends PureComponent {
  constructor() {
    super()

    this.timeCreated = (isEdited, timeCreated) => {
      const result = isEdited ? `edited ${timeCreated} ago` : `created ${timeCreated} ago`
      return result
    }
  }

  render() {
    const { description, isEdited, timeCreated, checked, onDeleted, onCompleted, onEdited } = this.props

    return (
      <div className="view">
        <input type="checkbox" className="toggle" onChange={onCompleted} checked={checked} />
        <label htmlFor="taskText">
          <span className="description">{description}</span>
          <span className="created">{this.timeCreated(isEdited, timeCreated)}</span>
        </label>
        <button className="icon icon-edit" type="button" aria-label="Edit" onClick={onEdited} />
        <button className="icon icon-destroy" type="button" aria-label="Destroy" onClick={onDeleted} />
      </div>
    )
  }
}
