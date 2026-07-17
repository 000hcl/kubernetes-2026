const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())

let todos = []

//Ingress?? headache
app.use(cors({
  origin: 'http://todo-app-svc:1234',
  credentials: true
}))

app.get('/api/todos', async (req, res) => {
  res.send({todos: todos})
})

app.post('/api/todos', async (req, res) => {
  const body = req.body
  if (body.content.length>150 || !body.content) {
    return res.status(400).send({error: 'Todo must be between 1 and 150 characters!'})
  }
  todos.push({content: body.content, done: false})
  return res.send({todos: todos})
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
