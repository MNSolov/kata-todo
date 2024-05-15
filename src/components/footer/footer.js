import React, { PureComponent } from 'react'

import TaskFilter from '../task-filter'

import './footer.css'

export default class Footer extends PureComponent {
  render() {
    const { taskCounter, onClearComplete, onClickAll, onClickActive, onClickComplete } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{taskCounter} items left</span>
        <TaskFilter onClickAll={onClickAll} onClickActive={onClickActive} onClickComplete={onClickComplete} />
        <button className="clear-completed" type="button" onClick={onClearComplete}>
          Clear completed
        </button>
      </footer>
    )
  }
}
