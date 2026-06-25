const express = require('express')
const app = express()
const fs = require('fs').promises

app.use(express.json())



app.get('/pingpong', async (req, res) => {
  try {
    await fs.access('/usr/src/app/persistent/pong.log', fs.constants.F_OK)
    const pongText = await fs.readFile('/usr/src/app/persistent/pong.log', 'utf8')
    const pongNr = Number(pongText)
    await fs.writeFile('/usr/src/app/persistent/pong.log', String(pongNr+1), 'utf8')
    return res.send(`pong ${pongNr+1}`)
  } catch (error) {
    console.log('Could not access:', error)
    await fs.writeFile('/usr/src/app/persistent/pong.log', '0', 'utf8')
    return res.send(`pong 0`)

  }

})


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})