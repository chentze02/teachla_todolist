import React, { useState, useEffect } from 'react'
import Todo from './component/todo'
import noteService from './services/backend'

const App = () => {
  const [list, setList] = useState([])
  const [item, setItem] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [isStriked, setIsStriked] = useState(false);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setList(initialNotes)
      })
  }, [])
  console.log('render', list.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const listObject = {
      content: item,
      date: new Date().toISOString(),
      completion: true,
    }

    noteService
      .create(listObject)
      .then(returnedItem => {
        setList(list.concat(returnedItem))
        setItem('')
      })
  }

  const handleListChange = (event) => {
    console.log(event.target.value)
    setItem(event.target.value)
  }

  const listToShow = showAll
  ? list
  : list.filter(list => list.completion)

  const toggleImportanceOf = (id) => {
  const lists = list.find(n => n.id === id)
  list.completion ? <div> {list.content} </div> : <i><div> {list.content}</div></i>
  const changedList = { ...lists, completion: !lists.completion }

  noteService
    .update(id, changedList)
    .then(returnedList => {
      setList(list.map(lists => lists.id !== id ? lists : returnedList))
  })
}

  return (
    <div>
      <h1>To-Do List</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'Undone' : 'All' }
        </button>
      </div>   
      <ul>
        {listToShow.map(list => 
            <Todo key={list.id} list={list} 
            toggleImportance={() => toggleImportanceOf(list.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={item}
          onChange={handleListChange}
        />
        <button type="submit">save</button>
      </form>  
    </div>
  )
}

export default App