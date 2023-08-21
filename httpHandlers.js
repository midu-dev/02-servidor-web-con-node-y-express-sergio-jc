const fs = require('node:fs')

const sendError = (req, res, statusCode = 404, errorMsg) => {
  res.writeHead(statusCode, { 'Content-type': ' text/html; chartset=utf-8' })
  return res.end(`<h1>${errorMsg ?? statusCode}</h1>`)
}

const sendLogo = (req, res) => {
  return fs.readFile('./assets/logo.webp', (error, image) => {
    if (error) {
      res.writeHead(404, {
        'Content-type': 'application/json; chartset=utf-8'
      })
      return res.end('<h1>error al cargar la imagen</h1>')
    }
    res.writeHead(200, { 'Content-type': ' image/webp' })
    return res.end(image)
  })
}

const helloWord = (req, res) => {
  res.writeHead(200, { 'Content-type': ' text/html; chartset=utf-8' })
  return res.end('<h1>¡Hola mundo!</h1>')
}

const createContact = (req, res) => {
  let body = ''
  req.on('data', (chunk) => {
    body += chunk.toString()
  })
  req.on('end', () => {
    const data = JSON.parse(body)
    res.writeHead(201, { 'Content-type': 'application/json; chartset=utf-8' })
    return res.end(JSON.stringify(data))
  })
}

module.exports = {
  sendError,
  sendLogo,
  helloWord,
  createContact
}
