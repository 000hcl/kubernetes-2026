import { useState, useEffect } from 'react'

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const todolist = [
    'Do this exercise',
    'Read up on C++',
    'Investigate moth issue'
  ]
  const getTodos = async () => {
    setTodos(todolist)
  }
  useEffect(() => {
    getTodos()
  }, [])


  return (
    <div>
      <ul>
        {todos.map(t =>
          <li key={t}>{t}</li>
        )}
      </ul>
    </div>


  )

}

export default TodoList