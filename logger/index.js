require('dotenv').config()
const express = require('express')
const app = express()

const randomString = Math.random().toString(36).substr(2, 8)

const getRandomString = () => {
  const timestamp = new Date().toISOString()

  console.log(timestamp, randomString)

  setTimeout(getRandomString, 5000)
}



app.use(express.json())

app.get('/', async (req, res) => {
  const timestamp = new Date().toISOString()
  res.send(`${randomString} ${timestamp}`)
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})

getRandomString()