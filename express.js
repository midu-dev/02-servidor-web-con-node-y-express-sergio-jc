const express = require('express')
const path = require('node:path')
const { PORT, ROUTES, REQUEST_METHODS } = require('./constants.js')

const app = express()

//* secio-note (1)
app.disable('x-powered-by')

//* secio-note (2)
app.use(express.json())

//* secio-note (3)
// @midudev ¿Si hubiesen archivos que no son estáticos u otros ficheros dentro del path especificado también son accesibles a la hora de entrar a sus respectivos paths?
app.use(express.static(path.join(__dirname, 'assets')))

app.all(ROUTES.ROOT, (req, res) => {
  if (req.method === REQUEST_METHODS.GET) {
    return res.status(200).send('<h1>¡Hola mundo!</h1>')
  }
  return res.status(405).end()
})
app.all(ROUTES.LOGO, (req, res) => {
  //* secio-note (4)
  if (req.method === REQUEST_METHODS.GET) {
    const logoPath = path.join('assets', 'logo.webp')
    // @midudev es la primera vez que veo "sendFile" por lo que no se si sea necesario pasarle ese objeto con root o si simplemente es mejor enviar el path completo.
    return res.status(200).sendFile(logoPath, { root: path.join(__dirname) })
  }
  return res.status(405).end()
})

// @midudev y ya para terminar (^^), no se si la forma que hice de validar y enviar asi el error 405 sea la mejor, por lo que me gustaria saber tu opión ya que tanto en el ejercicio de node:http como en el de express me quedo la duda si era optimo o recomendable hacerlo así, ya que hasta ahora nunca maneje este tipo de errores, así como tampoco utilice hasta ahora el app.all() y no me queda del todo claro como hacer este tipo de validaciones de una manera correcta, gracias por todo, pasa un lindo día.
app.all(ROUTES[404], (req, res) => {
  if (req.method === REQUEST_METHODS.GET) {
    return res.status(404).send('<h1>404</h1>')
  }
  return res.status(405).end()
})
app.all(ROUTES.CONTACT, (req, res) => {
  if (req.method === REQUEST_METHODS.POST) {
    const { body } = req
    return res.status(201).json(body)
  }
  return res.status(405).end()
})
app.use((req, res) => {
  return res.status(404).end()
})

// Ejercicio 2: crear servidor HTTP con Express
function startServer () {
  const server = app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
  return server
}

module.exports = {
  startServer
}

//* secio-notes:

//* Teoría de algunos metodos de res:
//  res.json() => este se encarga de convertir el json a string antes de enviarlo y pone el "Contect-type" como "application/json" por defecto
//  res.sendFile() => este termina la respuesta del servidor enviando el archivo especificado, con el "Contect-type" de su extensión.
//  res.send() =>  este termina la respuesta enviando el argumento especificado identificando automaticamente su "Contect-type"

//* app.disable (1): hay veces en los que queremos eliminar alguna cabezara que se envie por defecto como es el caso con 'x-powered-by' que indica con esta hecha la API sin embargo esto puede ser un problema de seguridad por lo que es recomendable desactivarla.

//* express.json (2): este middleware es una abstracción del código que midu mostro para resivir el body de una request en el formato json, este es util a la hora de manejar el body en motodos como PUT, POST, PATCH y aunque en teoría también se puede enviar el body con GET Y DELETE, esto no es del todo comun ya que en estos dos ultimos se suelen usar más querie params o la ruta misma.

//* express.static (3): express.static con este middleware en uso ya no hay necesidad de crear una ruta por cada archivo estatico, ya que este sirve cada archivo estatico segun la ruta del fichero especificada.

//* sendFile use (4): apesar del uso de static creé esta condicional con el fin de aplicar sendFile que es una forma directa de servir un archivo estatico.
