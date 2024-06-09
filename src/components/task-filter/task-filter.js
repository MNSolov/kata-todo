import React, { useState } from 'react'

import './task-filter.css'

export default function TaskFilter(props) {
  const { onClickAll, onClickActive, onClickComplete } = props
  const [buttonList, setButtonList] = useState([
    {
      id: 1,
      name: 'All',
      selected: true,
      func: onClickAll,
    },
    {
      id: 2,
      name: 'Active',
      selected: false,
      func: onClickActive,
    },
    {
      id: 3,
      name: 'Completed',
      selected: false,
      func: onClickComplete,
    },
  ])

  const onClickButton = (event) => {
    event.preventDefault()

    setButtonList((value) => {
      const result = value.map((item) => {
        const newItem = { ...item }
        newItem.selected = false
        if (newItem.name === event.target.textContent) {
          newItem.selected = true
          newItem.func()
        }
        return newItem
      })
      return result
    })
  }

  const buttons = buttonList.map((item) => {
    return (
      <li key={item.id}>
        <button className={item.selected ? 'selected' : ''} type="button" onClick={onClickButton}>
          {item.name}
        </button>
      </li>
    )
  })
  return <ul className="filters">{buttons}</ul>
}
