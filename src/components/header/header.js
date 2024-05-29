import React, { PureComponent } from 'react'

import './header.css'

export default class Header extends PureComponent {
  constructor() {
    super()
    this.state = { inputValue: '', inputMinValue: '', inputSecValue: '' }
    this.onKeyDown = (event) => {
      const { inputValue, inputMinValue, inputSecValue } = this.state
      if (event.code === 'Enter') {
        if (inputValue) {
          const { onAddTask } = this.props
          onAddTask(inputValue, inputMinValue, inputSecValue)
          this.setState({ inputValue: '', inputMinValue: '', inputSecValue: '' })
        }
      }
    }
    this.onValueChange = (event) => {
      this.setState({ inputValue: event.target.value })
    }

    this.onMinValueChange = (event) => {
      this.setState({ inputMinValue: event.target.value })
    }

    this.onSecValueChange = (event) => {
      this.setState({ inputSecValue: event.target.value })
    }
  }

  render() {
    const { inputValue, inputMinValue, inputSecValue } = this.state
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
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.onMinValueChange}
            onKeyDown={this.onKeyDown}
            value={inputMinValue}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onSecValueChange}
            onKeyDown={this.onKeyDown}
            value={inputSecValue}
          />
        </form>
      </header>
    )
  }
}
