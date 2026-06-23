const express = require('express')
const app = express()

app.use(express.json())

let pong = 0

app.get('/pingpong', async (req, res) => {
  res.send(`pong ${pong}`)
  pong = pong + 1
})


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})