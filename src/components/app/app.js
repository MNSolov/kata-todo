import React, { Component } from 'react'

import TaskList from '../task-list'
import Header from '../header'
import Footer from '../footer/footer'

import './app.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      taskList: [
        {
          id: 1,
          typeTask: 'completed',
          description: 'Complited task',
          timeCreated: '12 min ago',
        },
        {
          id: 2,
          typeTask: '',
          description: 'Edited task',
          timeCreated: '12 min ago',
        },
        {
          id: 3,
          typeTask: '',
          description: 'Active task',
          timeCreated: '12 min ago',
        },
      ],
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
        if (!result[numberTask].typeTask) {
          result[numberTask].typeTask = 'completed'
        } else {
          result[numberTask].typeTask = ''
        }
        return { taskList: result }
      })
    }
  }

  render() {
    const { taskList } = this.state
    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TaskList taskList={taskList} onDeleted={this.deleteTask} onCompleted={this.completeTask} />
          <Footer />
        </section>
      </section>
    )
  }
}
