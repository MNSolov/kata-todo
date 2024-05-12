import React from 'react'

import Task from '../task'
import './task-list.css'

function TaskList({ taskList }) {
  const taskElementList = taskList.map((item) => {
    const { id, typeTask, ...itemObj } = item

    return (
      <li key={id} className={typeTask}>
        <Task description={itemObj.description} timeCreated={itemObj.timeCreated} />
        <input type="text" className="edit" defaultValue="Editing task" />
      </li>
    )
  })
  return <ul className="todo-list">{taskElementList}</ul>
}

export default TaskList
