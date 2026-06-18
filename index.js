const randomString = Math.random().toString(36).substr(2, 8)

const getRandomString = () => {
  const timestamp = new Date().toISOString()

  console.log(timestamp, randomString)

  setTimeout(getRandomString, 5000)
}

getRandomString()