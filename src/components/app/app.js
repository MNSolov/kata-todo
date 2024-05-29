import React, { Component } from 'react'
import { formatDistance } from 'date-fns'

import TaskList from '../task-list'
import Header from '../header'
import Footer from '../footer/footer'

import './app.css'

export default class App extends Component {
  constructor() {
    super()

    this.countId = 0

    this.createTask = (textTask, timeTask) => {
      this.countId += 1
      return {
        id: this.countId,
        typeTask: 'active',
        description: textTask,
        timeCreated: new Date(),
        timeDistance: formatDistance(new Date(), new Date(), { includeSeconds: true }),
        isEdited: false,
        isVisible: true,
        timeTask,
        time: Date.now(),
        isTimer: true,
      }
    }

    this.state = {
      taskList: [],
      filter: 'all',
    }

    this.deleteTask = (id) => {
      this.setState(({ taskList }) => {
        const numberTask = taskList.findIndex((item) => item.id === id)
        const result = [...taskList.slice(0, numberTask), ...taskList.slice(numberTask + 1)]
        return { taskList: result }
      })
    }

    this.completeTask = (id) => {
      this.setState(({ taskList }) => {
        const numberTask = taskList.findIndex((item) => item.id === id)
        const result = [...taskList]
        if (result[numberTask].typeTask === 'active') {
          result[numberTask].typeTask = 'completed'
        } else {
          result[numberTask].typeTask = 'active'
          result[numberTask].time = Date.now()
        }
        return { taskList: result }
      })
    }

    this.addTask = (textTask, textMin, textSec) => {
      this.setState(({ taskList }) => {
        const newTask = this.createTask(textTask, 1000 * (Number(textMin) * 60 + Number(textSec)))
        const result = [newTask, ...taskList]
        return { taskList: result }
      })
    }

    this.clearComplete = () => {
      this.setState(({ taskList }) => {
        const result = taskList.filter((item) => item.typeTask === 'active' || item.typeTask === 'editing')
        return { taskList: result }
      })
    }

    this.calcTaskDistance = () => {
      this.setState(({ taskList }) => {
        const result = taskList.map((item) => {
          const newItem = { ...item }
          newItem.timeDistance = formatDistance(new Date(), newItem.timeCreated, {
            includeSeconds: true,
          })
          return newItem
        })
        return { taskList: result }
      })
    }

    this.setEditTask = (id) => {
      this.setState(({ taskList }) => {
        const countEditTask = taskList.filter((item) => item.typeTask === 'editing').length
        if (countEditTask > 0) return { taskList }
        const numberTask = taskList.findIndex((item) => item.id === id)
        const result = [...taskList]
        if (result[numberTask].typeTask !== 'completed') {
          result[numberTask].typeTask = 'editing'
        }
        return { taskList: result }
      })
    }

    this.onEditTask = (id, newDescription) => {
      this.setState(({ taskList }) => {
        const numberTask = taskList.findIndex((item) => item.id === id)
        const result = [...taskList]
        if (newDescription) {
          result[numberTask].description = newDescription
        }
        result[numberTask].typeTask = 'active'
        result[numberTask].timeCreated = new Date()
        result[numberTask].timeDistance = formatDistance(new Date(), new Date(), { includeSeconds: true })
        result[numberTask].isEdited = true
        result[numberTask].time = Date.now()
        return { taskList: result }
      })
    }

    this.onClickAll = () => {
      this.setState({ filter: 'all' })
    }

    this.onClickActive = () => {
      this.setState({ filter: 'active' })
    }

    this.onClickComplete = () => {
      this.setState({ filter: 'completed' })
      this.setState(({ taskList }) => {
        const resultIndex = taskList.findIndex((item) => item.typeTask === 'editing')
        const result = [...taskList]
        if (resultIndex > -1) {
          result[resultIndex].typeTask = 'active'
        }
        return { taskList: result }
      })
    }

    this.calcTimer = () => {
      this.setState(({ taskList }) => {
        const result = taskList.map((item) => {
          const newItem = { ...item }
          if (newItem.isTimer && newItem.typeTask === 'active') {
            newItem.timeTask += Date.now() - newItem.time
            newItem.time = Date.now()
          }
          return newItem
        })
        return { taskList: result }
      })
    }

    this.onPauseClick = (id) => {
      this.setState(({ taskList }) => {
        const numberTask = taskList.findIndex((item) => item.id === id)
        const result = [...taskList]
        result[numberTask].isTimer = false
        return { taskList: result }
      })
    }

    this.onPlayClick = (id) => {
      this.setState(({ taskList }) => {
        const numberTask = taskList.findIndex((item) => item.id === id)
        const result = [...taskList]
        result[numberTask].time = Date.now()
        result[numberTask].isTimer = true
        return { taskList: result }
      })
    }
  }

  componentDidMount() {
    this.intervalHdlr = setInterval(() => this.calcTaskDistance(), 60000)
    this.timerHdlr = setInterval(() => this.calcTimer(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalHdlr)
    clearInterval(this.timerHdlr)
  }

  render() {
    const { taskList, filter } = this.state
    const taskCount = taskList.filter((item) => item.typeTask === 'active' || item.typeTask === 'editing').length
    return (
      <>
        <Header onAddTask={this.addTask} />
        <section className="main">
          <TaskList
            taskList={taskList}
            onDeleted={this.deleteTask}
            onCompleted={this.completeTask}
            onSetEdited={this.setEditTask}
            onEditTask={this.onEditTask}
            filter={filter}
            onPauseClick={this.onPauseClick}
            onPlayClick={this.onPlayClick}
          />
          <Footer
            taskCounter={taskCount}
            onClearComplete={this.clearComplete}
            onClickAll={this.onClickAll}
            onClickActive={this.onClickActive}
            onClickComplete={this.onClickComplete}
          />
        </section>
      </>
    )
  }
}
