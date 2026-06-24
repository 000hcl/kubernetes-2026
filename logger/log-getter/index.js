const express = require('express')
const app = express()
const fs = require('fs').promises

app.get('/logs', async (req, res) => {
  try {
    const logs = await fs.readFile('/usr/src/app/files/log_output.log', 'utf8')
    res.type('text/plain')
    res.send(logs)
    console.log(logs)
  } catch (error) {
    res.send(`error: ${error}`)
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})