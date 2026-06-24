const fs = require('fs').promises

const randomString = Math.random().toString(36).substr(2, 8)

const appendString = async () => {
  try {
    const timestamp = new Date().toISOString()
    const logEntry = `${randomString} ${timestamp}\n`;
    await fs.appendFile('/usr/src/app/files/log_output.log', logEntry, 'utf8');

    console.log(`Log entry added: ${randomString} ${timestamp}`);
  } catch (err) {
    console.error('Error appending to file:', err);
  }
  setTimeout(appendString, 5000)
}

appendString()

// https://www.w3schools.com/nodejs/nodejs_filesystem.asp