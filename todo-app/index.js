require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use("/pstorage", express.static("/usr/src/app/persistent"));
const fs = require('fs').promises

app.post('/imgcheck', async (req, res) => {
  try {
    await fs.access('/usr/src/app/persistent/frontimg.jpg', fs.constants.F_OK)
    console.log('found img file')
  } catch {
    console.log('could not find file, downloading');
    await downloadImg()
  }
  const stats = await fs.stat('/usr/src/app/persistent/frontimg.jpg')
  const now = new Date()
  const age = (now-stats.mtime)/ (1000 * 60)
  console.log(`image age is ${age} minutes`)
  if (age > 10) {
    console.log('img older than 10 minutes, downloading')
    await downloadImg()
  }

})

const downloadImg = async () => {
  try {
    const picsumUrl = 'https://picsum.photos/200'
    const response = await fetch(picsumUrl)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await fs.writeFile('/usr/src/app/persistent/frontimg.jpg', buffer)
  } catch (error) {
    console.log(`Error in downloading: ${error}`)
  }

}





const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
