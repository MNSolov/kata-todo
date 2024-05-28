import React, { PureComponent } from 'react'

import './header.css'

export default class Header extends PureComponent {
  constructor() {
    super()
    this.state = { inputValue: '' }
    this.onKeyDown = (event) => {
      if (event.code === 'Enter') {
        if (event.target.value) {
          const { onAddTask } = this.props
          onAddTask(event.target.value)
          this.setState({ inputValue: '' })
        }
      }
    }
    this.onValueChange = (event) => {
      this.setState({ inputValue: event.target.value })
    }
  }

  render() {
    const { inputValue } = this.state
    return (
      <header>
        <h1>Todos</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this.onKeyDown}
            onChange={this.onValueChange}
            value={inputValue}
          />
          <input className="new-todo-form__timer" placeholder="Min" />
          <input className="new-todo-form__timer" placeholder="Sec" />
        </form>
      </header>
    )
  }
}
