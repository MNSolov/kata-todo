import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

export default class TaskList extends PureComponent {
  constructor() {
    super()

    this.onKeyDown = (event, id) => {
      if (event.code === 'Enter') {
        if (event.target.value) {
          const { onEditTask } = this.props
          onEditTask(id, event.target.value)
        }
      }
    }
  }

  render() {
    const { taskList, filter, onDeleted, onCompleted, onSetEdited } = this.props

    let taskElementList = taskList.filter(
      (item) => item.typeTask === filter || filter === 'all' || (filter === 'active' && item.typeTask === 'editing')
    )
    taskElementList = taskElementList.map((item) => {
      const { id, typeTask, description, timeDistance, isEdited } = item
      const checked = typeTask === 'completed'
      return (
        <li key={id} className={typeTask === 'active' ? '' : typeTask}>
          <Task
            description={description}
            isEdited={isEdited}
            timeCreated={timeDistance}
            checked={checked}
            onEdited={() => onSetEdited(id)}
            onDeleted={() => {
              onDeleted(id)
            }}
            onCompleted={() => {
              onCompleted(id)
            }}
          />
          <input
            type="text"
            className="edit"
            defaultValue={description}
            onKeyDown={(event) => this.onKeyDown(event, id)}
          />
        </li>
      )
    })

    return <ul className="todo-list">{taskElementList}</ul>
  }
}

TaskList.propTypes = {
  taskList: PropTypes.arrayOf(PropTypes.shape).isRequired,
  filter: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onSetEdited: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
}
