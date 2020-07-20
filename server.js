const express = require ('express') // Require --> requisição para chamar dependência, arquivo, etc
const nunjucks = require ('nunjucks')
const routes = require ('./routes')
const methodOverride = require ('method-override')

const server = express ()

server.use (express.urlencoded ({ extended:true })) // linha responsável por habilitar o uso do req.body
server.use (express.static ('public/styles'))
server.use (express.static ('public/scripts'))
server.use (methodOverride('_method'))
server.use (routes)

server.set ('view engine', 'njk')
nunjucks.configure ('views', {
  express: server,
  autoescape: false,
  noCache: true
})

server.listen (5000, () => {
  console.log ('Server is running')
})
