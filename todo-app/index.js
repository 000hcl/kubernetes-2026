require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.static('dist'))
app.use(express.json())

const fs = require('fs').promises

const config = {
  STORAGE_ROUTE: process.env.STORAGE_ROUTE,
  IMG_DOWNLOAD: process.env.IMG_DOWNLOAD,
  PORT: Number(process.env.PORT)
}

app.use("/pstorage", express.static(config.STORAGE_ROUTE));
app.post('/imgcheck', async (req, res) => {
  try {
    await fs.access(`${config.STORAGE_ROUTE}/frontimg.jpg`, fs.constants.F_OK)
    console.log('found img file')
  } catch {
    console.log('could not find file, downloading');
    await downloadImg()
  }
  const stats = await fs.stat(`${config.STORAGE_ROUTE}/frontimg.jpg`)
  const now = new Date()
  const age = (now-stats.mtime)/ (1000 * 60)
  console.log(`image age is ${age} minutes`)
  if (age > 10) {
    console.log('img older than 10 minutes, downloading')
    await downloadImg()
  }

})

app.get('/config', async (req, res) => {
  res.json({ imageName: config.IMAGE_NAME })
})

const downloadImg = async () => {
  try {
    const picsumUrl = config.IMG_DOWNLOAD
    const response = await fetch(picsumUrl)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await fs.writeFile(`${config.STORAGE_ROUTE}/frontimg.jpg`, buffer)
  } catch (error) {
    console.log(`Error in downloading: ${error}`)
  }

}




app.listen(config.PORT, () => {
  console.log(`Server started in port ${config.PORT}`)
})
