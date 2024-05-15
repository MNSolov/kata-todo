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

    this.createTask = (textTask) => {
      this.countId += 1
      return {
        id: this.countId,
        typeTask: 'active',
        description: textTask,
        timeCreated: new Date(),
        timeDistance: formatDistance(new Date(), new Date(), { includeSeconds: true }),
        isEdited: false,
        isVisible: true,
      }
    }

    this.state = {
      taskList: [this.createTask('Active task 1'), this.createTask('Active task 2'), this.createTask('Active task 3')],
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
        }
        return { taskList: result }
      })
    }

    this.addTask = (textTask) => {
      this.setState(({ taskList }) => {
        const newTask = this.createTask(textTask)
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
        result[numberTask].description = newDescription
        result[numberTask].typeTask = 'active'
        result[numberTask].timeCreated = new Date()
        result[numberTask].timeDistance = formatDistance(new Date(), new Date(), { includeSeconds: true })
        result[numberTask].isEdited = true
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
    }
  }

  componentDidMount() {
    this.intervalHdlr = setInterval(() => this.calcTaskDistance(), 60000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalHdlr)
  }

  render() {
    const { taskList, filter } = this.state
    const taskCount = taskList.filter((item) => item.typeTask === 'active' || item.typeTask === 'editing').length
    return (
      <section className="todoapp">
        <Header onAddTask={this.addTask} />
        <section className="main">
          <TaskList
            taskList={taskList}
            onDeleted={this.deleteTask}
            onCompleted={this.completeTask}
            onSetEdited={this.setEditTask}
            onEditTask={this.onEditTask}
            filter={filter}
          />
          <Footer
            taskCounter={taskCount}
            onClearComplete={this.clearComplete}
            onClickAll={this.onClickAll}
            onClickActive={this.onClickActive}
            onClickComplete={this.onClickComplete}
          />
        </section>
      </section>
    )
  }
}
