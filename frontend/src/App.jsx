import axios from 'axios'
import { useEffect } from "react"
import TodoForm from './components/todoForm'
import TodoList from './components/todoList'
import { useState } from 'react'
import todoService from './services/todoService'

function App() {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    const getAll = async () => {
      const todolist = await todoService.getTodos()
      setTodos(todolist)
    }
    try {
      getAll()
    } catch (error) {
      console.log(error)
    }
    
    try {
      axios.post('/imgcheck').then(
        console.log('Sent request to /imgcheck')
      )
    } catch (error) {
      console.log(`Could not send request to /imgcheck: ${error}`)
    }
  }, [])

  const handleCreate = async (newTodo) => {
    const newTodos = await todoService.createTodo(newTodo)
    setTodos(newTodos)
  }


  return (
    <div>
      <h2>
        Todo App
      </h2>
      <img src={"/pstorage/frontimg.jpg"} />
      <i>DevOps with Kubernetes 2026</i>
      <TodoForm handleCreate={handleCreate}/>
      <TodoList todos={todos}/>

    </div>
  )
}

export default App
