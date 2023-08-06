const http = require('node:http')
const { REQUEST_METHODS, ROUTES, PORT } = require('./contants.js')
const { sendError, helloWord, sendLogo, createContact } = require('./httpHandlers.js')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (url) {
    case ROUTES.ROOT: {
      if (method === REQUEST_METHODS.GET) return helloWord(req, res)
      return sendError(req, res, 405)
    }
    case ROUTES.LOGO: {
      if (method === REQUEST_METHODS.GET) return sendLogo(req, res)
      return sendError(req, res, 405)
    }
    case ROUTES.CONTACT: {
      if (method === REQUEST_METHODS.POST) return createContact(req, res)
      return sendError(req, res, 405)
    }
    case ROUTES[404] : {
      if (method === REQUEST_METHODS.GET) return sendError(req, res)
      return sendError(req, res, 405)
    }
    default: {
      return sendError(req, res, 404)
    }
  }
}

// @midudev no sé si la forma que hice de validar y enviar así el error 405 sea la mejor, ya que me quedo bastante larga la solución, y por ese motivo decidí separar la lógica, por lo que me gustaria saber tú opión ya que me quedo la duda si era optimo o recomendable hacerlo así, ya que hasta ahora nunca maneje este tipo de errores, por lo que megustaría saber tú opinión.

const server = http.createServer(processRequest)

server.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

// Ejercicio 1: crear servidor HTTP con Node
function startServer () {
  return server
}

module.exports = {
  startServer
}
