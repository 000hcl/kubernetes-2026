const express = require('express')
const app = express()
const pgp = require('pg-promise')()

POSTGRES_USER = process.env.POSTGRES_USER
POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
POSTGRES_DB = process.env.POSTGRES_DB
HOST = process.env.HOST
DB_PORT = process.env.DB_PORT

//postgres://{user}:{password}@postgres-svc:5432/db
const db = pgp(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${HOST}:${DB_PORT}/${POSTGRES_DB}`)

app.use(express.json())


const setUpTableIfNotExisting = async () => {
  db.none('CREATE TABLE IF NOT EXISTS pongs (pongs INTEGER, id INTEGER PRIMARY KEY); INSERT INTO pongs(pongs, id) VALUES($1, $2) ON CONFLICT (id) DO NOTHING', [0, 1])
}

app.get('/', async (req, res) => {
  await setUpTableIfNotExisting()
  const result = await db.one('SELECT pongs FROM pongs WHERE id = 1;')
  const newpongs = result.pongs+1
  await db.none(`UPDATE pongs SET pongs = $1 WHERE id = 1`, [newpongs])
  res.send(`pong ${newpongs}`)

})

app.get('/pings', async (req, res) => {
  try {
    await setUpTableIfNotExisting()
    const result = await db.one('SELECT pongs FROM pongs WHERE id = 1;')
    res.send(result.pongs)
  } catch (error) {
    console.log('Could not get /pings', error)
  }
})

app.get('/', (req, res) => {
  res.sendStatus(200)
})


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})