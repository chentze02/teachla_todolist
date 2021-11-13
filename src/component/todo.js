import React from 'react'

const Todo = ({ list, toggleImportance }) => {
  const label = list.completion
    ? 'done' : 'undo'
  

  return (
    <li style={{
      fontStyle: list.completion ? 'italic' : 'normal',
      color: list.completion ? 'red' : 'blue'
    }}>
      {list.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Todo