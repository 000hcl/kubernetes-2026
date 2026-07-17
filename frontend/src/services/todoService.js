import axios from 'axios'

const baseUrl = '/api'

const getTodos = async () => {
  const todos = await axios.get(`${baseUrl}/todos`)
  console.log(todos)
  return todos.data.todos
}

const createTodo = async (content) => {
  const newTodos = await axios.post(`${baseUrl}/todos`, {content})
  console.log(newTodos)
  return newTodos.data.todos
}

export default { getTodos, createTodo }