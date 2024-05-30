import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

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
    const {
      description,
      isEdited,
      timeCreated,
      checked,
      onDeleted,
      onCompleted,
      onEdited,
      timeTask,
      onPauseClick,
      onPlayClick,
    } = this.props

    return (
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={(event) => {
            event.preventDefault()
            onCompleted()
          }}
          checked={checked}
        />
        <label htmlFor="taskText">
          <span className="title">{description}</span>
          <span className="description">
            <button
              className="icon icon-play"
              type="button"
              aria-label="play"
              onClick={(event) => {
                event.preventDefault()
                onPlayClick()
              }}
            />
            <button
              className="icon icon-pause"
              type="button"
              aria-label="pause"
              onClick={(event) => {
                event.preventDefault()
                onPauseClick()
              }}
            />
            {format(timeTask, ' mm:ss ')}
          </span>
          <span className="created">{this.timeCreated(isEdited, timeCreated)}</span>
        </label>
        <button
          className="icon icon-edit"
          type="button"
          aria-label="Edit"
          onClick={(event) => {
            event.preventDefault()
            onEdited()
          }}
        />
        <button className="icon icon-destroy" type="button" aria-label="Destroy" onClick={onDeleted} />
      </div>
    )
  }
}

Task.propTypes = {
  description: PropTypes.string.isRequired,
  isEdited: PropTypes.bool.isRequired,
  timeCreated: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
}
