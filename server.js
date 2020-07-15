const express = require ('express') // Require --> requisição para chamar dependência, arquivo, etc
const nunjucks = require ('nunjucks')
const routes = require ('./routes')
const server = express ()

server.use (express.static ('public/styles'))
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
