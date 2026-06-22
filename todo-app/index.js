require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
  res.send('ok')
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})