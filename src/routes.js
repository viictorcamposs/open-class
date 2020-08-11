const express = require ('express')
const teachers = require ('./app/controllers/teachers')
const students = require ('./app/controllers/students')
const routes = express.Router ()

routes.get ('/home', function ( req, res ) {
  return res.render ('home')
})

routes.get ( '/teachers', teachers.index )
routes.put ( '/teachers', teachers.put )
routes.post ( '/teachers', teachers.post )
routes.delete ('/teachers', teachers.delete )
routes.get ('/teachers/create', teachers.create )
routes.get ( '/teachers/:id', teachers.show )
routes.get ( '/teachers/:id/edit', teachers.edit )

//-----------------------

routes.get ( '/students', students.index )
routes.put ( '/students', students.put )
routes.post ( '/students', students.post )
routes.delete ('/students', students.delete )
routes.get ('/students/create', students.create )
routes.get ( '/students/:id', students.show )
routes.get ( '/students/:id/edit', students.edit )

module.exports = routes