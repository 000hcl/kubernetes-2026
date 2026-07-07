import axios from 'axios'
import { useEffect } from "react"
import TodoForm from './components/todoForm'
import TodoList from './components/todoList'

function App() {
  useEffect(() => {
    try {
      axios.post('/imgcheck').then(
        console.log('Sent request to /imgcheck')
      )
    } catch (error) {
      console.log(`Could not send request to /imgcheck: ${error}`)
    }
  }, [])


  return (
    <div>
      <h2>
        Todo App
      </h2>
      <img src={"/pstorage/frontimg.jpg"} />
      <i>DevOps with Kubernetes 2026</i>
      <TodoForm/>
      <TodoList/>

    </div>
  )
}

export default App
