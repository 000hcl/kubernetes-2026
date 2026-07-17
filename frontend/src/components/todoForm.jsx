import { useState } from 'react'

const TodoForm = ({ handleCreate }) => {
  const [todo, setTodo] = useState('')
  const [error, setError] = useState(null)
  const addTodo = async (event) => {
    event.preventDefault()
    try {
      await handleCreate(todo)
      setError(null)
      setTodo('')
    } catch (error) {
      console.log(error)
      console.log(error.response.data.error)
      setError('Invalid content')
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