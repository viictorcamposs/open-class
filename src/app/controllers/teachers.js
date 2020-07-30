const { age, date } = require ('../../lib/utils')
const Teacher = require ('../models/Teacher')	

module.exports = {
	index ( req, res ) {
		Teacher.all ( function ( teachers ) {
			return res.render ('teachers/teachers', { teachers })
		})
	},
	create ( req, res ) {
		return res.render ('teachers/create')
	},
	post ( req, res ) {
		const keys = Object.keys (req.body)
		for ( key of keys ) {
			if ( req.body[key] == "") return res.send ("Preencha todos os campos")
		}
		Teacher.create ( req.body, function ( teacher ) {
			return res.redirect (`/teachers/${ teacher.id }`)
		})
	},
	show ( req, res ) {
		Teacher.find ( req.params.id, function ( teacher ) {
			if ( !teacher ) return res.send ( 'Teacher not found! ')
			teacher.age = age ( teacher.birth_date )
			teacher.created_at = date (teacher.created_at).format
			teacher.subjects_taught = teacher.subjects_taught.split (',')
			return res.render (`teachers/show`, { teacher })
		})
	},
	edit ( req, res ) {
		Teacher.find ( req.params.id, function ( teacher ) {
			if ( !teacher ) return res.send ( 'Teacher not found!' )
			teacher.birth_date = date ( teacher.birth_date ).iso 
			return res.render ( 'teachers/edit', { teacher })
		})
	},
	put ( req, res ) {
		const keys = Object.keys (req.body)
		for ( key of keys ) {
			if ( req.body[key] == "") return res.send ("Preencha todos os campos")
		}
		Teacher.update ( req.body, function () {
			return res.redirect ( `/teachers/${ req.body.id }`)
		})
	},
	delete ( req, res ) {
		Teacher.delete ( req.body.id, function () {
			return res.redirect ( '/teachers' )
		})
	}
}