import React, { useState, useEffect } from 'react'
import { formatDistance } from 'date-fns'

import TaskList from '../task-list'
import Header from '../header'
import Footer from '../footer/footer'

import './app.css'

let countId = 0

export default function App() {
  const [taskList, setTaskList] = useState([])
  const [filter, setFilter] = useState('all')

  const createTask = (textTask, timeTask) => {
    countId += 1
    return {
      id: countId,
      typeTask: 'active',
      description: textTask,
      timeCreated: new Date(),
      timeDistance: formatDistance(new Date(), new Date(), { includeSeconds: true }),
      isEdited: false,
      isVisible: true,
      timeTask,
      time: Date.now(),
      isTimer: true,
      ref: React.createRef(),
    }
  }

  const deleteTask = (id) => {
    setTaskList((value) => {
      const numberTask = value.findIndex((item) => item.id === id)
      const result = [...value.slice(0, numberTask), ...value.slice(numberTask + 1)]
      return result
    })
  }

  const completeTask = (id) => {
    setTaskList((value) => {
      const numberTask = value.findIndex((item) => item.id === id)
      const result = [...value]
      if (result[numberTask].typeTask === 'active') {
        result[numberTask].typeTask = 'completed'
      } else {
        result[numberTask].typeTask = 'active'
        result[numberTask].time = Date.now()
      }
      return result
    })
  }

  const addTask = (textTask, textMin, textSec) => {
    setTaskList((value) => {
      const newTask = createTask(textTask, 1000 * (Number(textMin) * 60 + Number(textSec)))
      const result = [newTask, ...value]
      return result
    })
  }

  const clearComplete = () => {
    setTaskList((value) => {
      const result = value.filter((item) => item.typeTask === 'active' || item.typeTask === 'editing')
      return result
    })
  }

  const calcTaskDistance = () => {
    setTaskList((value) => {
      const result = value.map((item) => {
        const newItem = { ...item }
        newItem.timeDistance = formatDistance(new Date(), newItem.timeCreated, {
          includeSeconds: true,
        })
        return newItem
      })
      return result
    })
  }

  const setEditTask = (id) => {
    setTaskList((value) => {
      const countEditTask = value.filter((item) => item.typeTask === 'editing').length
      if (countEditTask > 0) return value
      const numberTask = value.findIndex((item) => item.id === id)
      const result = [...value]
      if (result[numberTask].typeTask !== 'completed') {
        result[numberTask].typeTask = 'editing'
      }
      return result
    })
  }

  const onEditTask = (id, newDescription) => {
    setTaskList((value) => {
      const numberTask = value.findIndex((item) => item.id === id)
      const result = [...value]
      if (newDescription) {
        result[numberTask].description = newDescription
      } else {
        result[numberTask].ref.current.value = result[numberTask].description
      }
      result[numberTask].typeTask = 'active'
      result[numberTask].timeCreated = new Date()
      result[numberTask].timeDistance = formatDistance(new Date(), new Date(), { includeSeconds: true })
      result[numberTask].isEdited = true
      result[numberTask].time = Date.now()
      return result
    })
  }

  const onClickAll = () => {
    setFilter('all')
  }

  const onClickActive = () => {
    setFilter('active')
  }

  const onClickComplete = () => {
    setFilter('completed')
    setTaskList((value) => {
      const resultIndex = value.findIndex((item) => item.typeTask === 'editing')
      const result = [...value]
      if (resultIndex > -1) {
        result[resultIndex].typeTask = 'active'
      }
      return result
    })
  }

  const calcTimer = () => {
    setTaskList((value) => {
      const result = value.map((item) => {
        const newItem = { ...item }
        if (newItem.isTimer && newItem.typeTask === 'active') {
          newItem.timeTask += Date.now() - newItem.time
          newItem.time = Date.now()
        }
        return newItem
      })
      return result
    })
  }

  const onPauseClick = (id) => {
    setTaskList((value) => {
      const numberTask = value.findIndex((item) => item.id === id)
      const result = [...value]
      result[numberTask].isTimer = false
      return result
    })
  }

  const onPlayClick = (id) => {
    setTaskList((value) => {
      const numberTask = value.findIndex((item) => item.id === id)
      const result = [...value]
      result[numberTask].time = Date.now()
      result[numberTask].isTimer = true
      return result
    })
  }

  function onPageClick(event) {
    taskList.forEach((item) => {
      if (
        item.ref.current &&
        !item.ref.current.contains(event.target) &&
        item.typeTask === 'editing' &&
        !event.defaultPrevented
      ) {
        onEditTask(item.id)
      }
    })
  }

  function onPageKeyDown(event) {
    if (event.code === 'Escape') {
      const numberTask = taskList.findIndex((item) => item.typeTask === 'editing')
      if (numberTask >= 0) {
        onEditTask(taskList[numberTask].id)
      }
    }
  }

  useEffect(() => {
    const intervalHdlr = setInterval(() => calcTaskDistance(), 60000)
    const timerHdlr = setInterval(() => calcTimer(), 1000)
    const page = document.querySelector('html')

    page.addEventListener('click', onPageClick)
    page.addEventListener('keydown', onPageKeyDown)

    return () => {
      clearInterval(intervalHdlr)
      clearInterval(timerHdlr)
      page.removeEventListener('click', onPageClick)
      page.removeEventListener('keydown', onPageKeyDown)
    }
  })

  const taskCount = taskList.filter((item) => item.typeTask === 'active' || item.typeTask === 'editing').length
  return (
    <>
      <Header onAddTask={addTask} />
      <section className="main">
        <TaskList
          taskList={taskList}
          onDeleted={deleteTask}
          onCompleted={completeTask}
          onSetEdited={setEditTask}
          onEditTask={onEditTask}
          filter={filter}
          onPauseClick={onPauseClick}
          onPlayClick={onPlayClick}
        />
        <Footer
          taskCounter={taskCount}
          onClearComplete={clearComplete}
          onClickAll={onClickAll}
          onClickActive={onClickActive}
          onClickComplete={onClickComplete}
        />
      </section>
    </>
  )
}
