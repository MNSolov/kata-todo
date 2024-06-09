import React from 'react'
import { format } from 'date-fns'

import './task.css'

const funcTimeCreated = (isEdited, timeCreated) => {
  const result = isEdited ? `edited ${timeCreated} ago` : `created ${timeCreated} ago`
  return result
}

export default function Task(props) {
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
  } = props

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
        <span className="created">{funcTimeCreated(isEdited, timeCreated)}</span>
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
