import React from 'react'

import Task from '../task'
import './task-list.css'

const taskList = [
  {
    id: 1,
    typeTask: 'completed',
    description: 'Complited task',
    timeCreated: '12 min ago',
  },
  {
    id: 2,
    typeTask: 'editing',
    description: 'Edited task',
    timeCreated: '12 min ago',
  },
  {
    id: 3,
    typeTask: '',
    description: 'Active task',
    timeCreated: '12 min ago',
  },
]

function TaskList() {
  const taskElementList = taskList.map((item) => {
    const { id, typeTask, ...itemObj } = item

    return (
      <li key={id} className={typeTask}>
        <Task description={itemObj.description} timeCreated={itemObj.timeCreated} />
      </li>
    )
  })
  return <ul className="todo-list">{taskElementList}</ul>
}

export default TaskList
