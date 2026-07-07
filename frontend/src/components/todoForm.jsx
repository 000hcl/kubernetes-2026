import { useState } from 'react'

const TodoForm = () => {
  const [todo, setTodo] = useState('')
  const [error, setError] = useState(null)
  const addTodo = async (event) => {
    event.preventDefault()
    console.log(todo)
    if (todo.length>140) {
      setError('Todo length exceeds 140 characters!')
    } else {
      setError(null)
      setTodo('')
    }
  }
  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type='text'
          onChange={({ target }) => setTodo(target.value)}
          value={todo}
        />
        <button type='submit'>submit</button>
        <div>
          {error}
        </div>
        
      </form>

    </div>
  )
}

export default TodoForm