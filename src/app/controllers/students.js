const { age, date, grade } = require ('../../lib/utils')
const Student = require ('../models/Student')	

module.exports = {
	index ( req, res ) {
		Student.all ( function ( students ) {
			return res.render ('students/students', { students })
		})
	},
	create ( req, res ) {
		return res.render ('students/create')
	},
	post ( req, res ) {
		const keys = Object.keys (req.body)
		for ( key of keys ) {
			if ( req.body[key] == "") return res.send ("Preencha todos os campos")
		}
		Student.create ( req.body, function ( student ) {
			return res.redirect (`/students`)
		})
	},
	show ( req, res ) {
		Student.find ( req.params.id, function ( student ) {
			if ( !student ) return res.send ( 'Student not found! ')
			student.age = age ( student.birth_date )
			student.birth_date = date (student.birth_date).birthDay
			student.education_level = grade ( student.education_level )
			return res.render (`students/show`, { student })
		})
	},
	edit ( req, res ) {
		Student.find ( req.params.id, function ( student ) {
			if ( !student ) return res.send ( 'Student not found!' )
			student.birth_date = date ( student.birth_date ).iso 
			return res.render ( 'students/edit', { student })
		})
	},
	put ( req, res ) {
		const keys = Object.keys (req.body)
		for ( key of keys ) {
			if ( req.body[key] == "") return res.send ("Preencha todos os campos")
		}
		Student.update ( req.body, function () {
			return res.redirect ( `/students/${ req.body.id }`)
		})
	},
	delete ( req, res ) {
		Student.delete ( req.body.id, function () {
			return res.redirect ( '/students' )
		})
	}
}