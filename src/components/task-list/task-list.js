import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

const onKeyDown = (event, id, props) => {
  if (event.code === 'Enter') {
    if (event.target.value) {
      const { onEditTask } = props
      onEditTask(id, event.target.value)
    }
  }
}

export default function TaskList(props) {
  const { taskList, filter, onDeleted, onCompleted, onSetEdited, onPauseClick, onPlayClick } = props

  let taskElementList = taskList.filter(
    (item) => item.typeTask === filter || filter === 'all' || (filter === 'active' && item.typeTask === 'editing')
  )
  taskElementList = taskElementList.map((item) => {
    const { id, typeTask, description, timeDistance, isEdited, timeTask, ref } = item

    const checked = typeTask === 'completed'
    return (
      <li key={id} className={typeTask === 'active' ? '' : typeTask}>
        <Task
          description={description}
          isEdited={isEdited}
          timeCreated={timeDistance}
          checked={checked}
          onEdited={() => {
            onSetEdited(id)
          }}
          onDeleted={() => {
            onDeleted(id)
          }}
          onCompleted={() => {
            onCompleted(id)
          }}
          onPauseClick={() => {
            onPauseClick(id)
          }}
          onPlayClick={() => {
            onPlayClick(id)
          }}
          timeTask={timeTask}
        />
        <input
          type="text"
          className="edit"
          defaultValue={description}
          onKeyDown={(event) => onKeyDown(event, id, props)}
          ref={ref}
        />
      </li>
    )
  })

  return <ul className="todo-list">{taskElementList}</ul>
}

TaskList.propTypes = {
  taskList: PropTypes.arrayOf(PropTypes.shape).isRequired,
  filter: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onSetEdited: PropTypes.func.isRequired,
}
