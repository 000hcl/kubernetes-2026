const express = require('express')
const app = express()
app.use(express.json())
const pgp = require('pg-promise')()

POSTGRES_USER = process.env.POSTGRES_USER
POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
POSTGRES_DB = process.env.POSTGRES_DB
HOST = process.env.HOST
DB_PORT = process.env.DB_PORT

//postgres://postgres:postgres@postgres-svc:5432/projectdb
const db = pgp(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${HOST}:${DB_PORT}/${POSTGRES_DB}`)



const setUpTableIfNotExisting = async () => {
  db.none('CREATE TABLE IF NOT EXISTS todos (id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, content TEXT, done BOOLEAN DEFAULT FALSE);')
}

app.get('/api/todos', async (req, res) => {
  await setUpTableIfNotExisting()
  const result = await db.any('SELECT * FROM todos;')
  res.send({todos: result? result : []})
})

app.post('/api/todos', async (req, res) => {
  const body = req.body
  if (!body.content || body.content.length > 150) {
    console.log(`POST /api/todos ERROR: content too long \n content: ${body.content}`)
    return res.status(400).send({error: 'Todo must be between 1 and 150 characters!'})
  }
  await setUpTableIfNotExisting()
  try {
    await db.none('INSERT INTO todos(content) VALUES($1)', [body.content])
    const result = await db.any('SELECT * FROM todos;')
    console.log(`POST /api/todos content: ${body.content}`)
    return res.send({todos: result? result : []})
  } catch (error) {
    console.log(`POST /api/todos ERROR: ${error}`)
  }

})

const PORT = Number(process.env.PORT)
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
