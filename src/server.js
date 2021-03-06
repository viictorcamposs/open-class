const express = require ('express') // Require --> requisição para chamar dependência, arquivo, etc
const nunjucks = require ('nunjucks')
const routes = require ('./routes')
const server = express ()
const methodOverride = require ('method-override')


server.use (express.urlencoded ({ extended:true })) // linha responsável por habilitar o uso do req.body
server.use (express.static ('public/styles'))
server.use (express.static ('public/scripts'))
server.use (methodOverride('_method'))
server.use (routes)

server.set ('view engine', 'njk')
nunjucks.configure ('src/app/views', {
  express: server,
  autoescape: false,
  noCache: true
})

server.listen (5000, () => {
  console.log ('Server is running')
})
