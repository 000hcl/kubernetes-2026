const express = require('express')
const app = express()
app.use(express.json())

let todos = []


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

const PORT = Number(process.env.PORT)
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
