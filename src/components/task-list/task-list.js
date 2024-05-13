import React, { PureComponent } from 'react'

import Task from '../task'
import './task-list.css'

export default class TaskList extends PureComponent {
  render() {
    const { taskList, onDeleted, onCompleted } = this.props

    const taskElementList = taskList.map((item) => {
      const { id, typeTask, ...itemObj } = item
      const checked = typeTask === 'completed'

      return (
        <li key={id} className={typeTask}>
          <Task
            description={itemObj.description}
            timeCreated={itemObj.timeDistance}
            checked={checked}
            onDeleted={() => {
              onDeleted(id)
            }}
            onCompleted={() => {
              onCompleted(id)
            }}
          />
          <input type="text" className="edit" defaultValue="Editing task" />
        </li>
      )
    })

    return <ul className="todo-list">{taskElementList}</ul>
  }
}
