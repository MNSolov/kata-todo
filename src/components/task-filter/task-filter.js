import React, { PureComponent } from 'react'

import './task-filter.css'

export default class TaskFilter extends PureComponent {
  constructor(props) {
    super(props)

    const { onClickAll, onClickActive, onClickComplete } = props

    this.state = {
      buttonList: [
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
      ],
    }

    this.onClickButton = (event) => {
      event.preventDefault()
      this.setState(({ buttonList }) => {
        const result = buttonList.map((item) => {
          const newItem = { ...item }
          newItem.selected = false
          if (newItem.name === event.target.textContent) {
            newItem.selected = true
            newItem.func()
          }
          return newItem
        })
        return { buttonList: result }
      })
    }
  }

  render() {
    const { buttonList } = this.state
    const buttons = buttonList.map((item) => {
      return (
        <li key={item.id}>
          <button className={item.selected ? 'selected' : ''} type="button" onClick={this.onClickButton}>
            {item.name}
          </button>
        </li>
      )
    })
    return <ul className="filters">{buttons}</ul>
  }
}
