import React, { useState } from 'react'

import './header.css'

export default function Header(props) {
  const [inputValue, setInputValue] = useState('')
  const [inputMinValue, setInputMinValue] = useState('')
  const [inputSecValue, setInputSecValue] = useState('')

  const onKeyDown = (event) => {
    if (event.code === 'Enter') {
      if (inputValue) {
        const { onAddTask } = props
        onAddTask(inputValue, inputMinValue, inputSecValue)
        setInputValue('')
        setInputMinValue('')
        setInputSecValue('')
      }
    }
  }

  const onValueChange = (event) => {
    setInputValue(event.target.value)
  }

  const onMinValueChange = (event) => {
    const regExp = /^\d+$/g

    if (regExp.test(event.target.value) || event.target.value === '') {
      setInputMinValue(event.target.value)
    }
  }

  const onSecValueChange = (event) => {
    const regExp = /^\d+$/g

    if (regExp.test(event.target.value) || event.target.value === '') {
      setInputSecValue(event.target.value)
    }
  }

  return (
    <header>
      <h1>Todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={onKeyDown}
          onChange={onValueChange}
          value={inputValue}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={onMinValueChange}
          onKeyDown={onKeyDown}
          value={inputMinValue}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={onSecValueChange}
          onKeyDown={onKeyDown}
          value={inputSecValue}
        />
      </form>
    </header>
  )
}
