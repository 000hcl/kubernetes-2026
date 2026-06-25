const fs = require('fs').promises

const randomString = Math.random().toString(36).substr(2, 8)

const getPong = async () => {
  try {
    await fs.access('/usr/src/app/persistent/pong.log', fs.constants.F_OK)
    const pongText = await fs.readFile('/usr/src/app/persistent/pong.log', 'utf8')

    return pongText
  } catch (error) {
    console.log('could not get pong file:', error)
    return '0'
  }
}

const appendString = async () => {
  try {
    const timestamp = new Date().toISOString()
    const logEntry = `${randomString} ${timestamp}\n`;
    const pong = await getPong()
    await fs.appendFile('/usr/src/app/files/log_output.log', logEntry, 'utf8');
    await fs.appendFile('/usr/src/app/files/log_output.log', `pong / pongs ${pong}\n`, 'utf8');

    console.log(`Log entry added: ${randomString} ${timestamp}`);
    console.log(`logged pongs: ${pong}`)
  } catch (err) {
    console.error('Error appending to file:', err);
  }
  setTimeout(appendString, 5000)
}

appendString()

// https://www.w3schools.com/nodejs/nodejs_filesystem.asp