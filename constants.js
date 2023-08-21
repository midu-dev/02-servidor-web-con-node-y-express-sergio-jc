const PORT = process.env.PORT ?? 1234

const ROUTES = Object.freeze({
  ROOT: '/',
  LOGO: '/logo.webp',
  CONTACT: '/contacto',
  404: '/404'
})

const REQUEST_METHODS = Object.freeze({
  GET: 'GET',
  POST: 'POST'
})

module.exports = {
  PORT,
  ROUTES,
  REQUEST_METHODS
}
