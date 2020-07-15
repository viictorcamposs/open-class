const express = require ('express')
const routes = express.Router ()

routes.get ('/', function ( req, res ) {
  return res.render ('home')
})

routes.get ('/teachers', function ( req, res ) {
  return res.render ('teachers/show')
})
routes.get ('/teachers/create', function ( req, res ) {
    return res.render ('teachers/create')
})

routes.get ('/students', function ( req, res ) {
  return res.render ('students/students')
})

module.exports = routes