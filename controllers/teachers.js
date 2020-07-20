const fs = require ('fs')
const data = require ('../data.json')
const { age, date } = require ('../public/scripts/utils')

exports.index = function ( req, res ) {
  const teachers = []
  for (let teacher of data.teachers) {
    const teacherClass = {
      ...teacher,
      classRoom: teacher.classRoom.split (',')
    }
    teachers.push (teacherClass) 
  }
  return res.render ('teachers/teachers', { teachers })
}
exports.show = function ( req, res ) {
  const { id } = req.params 
  const foundTeacher = data.teachers.find (function ( teacher ) {
    return teacher.id == id 
  })
  if ( !foundTeacher ) return res.send ("Teacher is not available")

  const teacher = {
    ...foundTeacher,
    age: age (foundTeacher.birth),
    classRoom: foundTeacher.classRoom.split (','),
    created_at: new Intl.DateTimeFormat ('en-GB').format (foundTeacher.created_at)
  }

  return res.render ('teachers/show', { teacher }) 
}
exports.create = function ( req, res ) {
  return res.render ('teachers/create')
} 
exports.post = function ( req, res ) {
  const keys = Object.keys (req.body)

  for ( key of keys ) {
    if ( req.body[key] == "") return res.send ("Preencha todos os campos")
  }

  let { avatar, birth, name, level, typeOfClass, classRoom } = req.body

  const id = Number (data.teachers.length + 1)
  const created_at = Date.now ()
  birth = Date.parse (birth)

  data.teachers.push ({
    id,
    avatar,
    name,
    birth,
    level,
    typeOfClass,
    classRoom,
    created_at
  })

  fs.writeFile ('data.json', JSON.stringify (data, null, 2), function (err) {
    if ( err ) return res.send ('Write file error!')

    return res.redirect ('teachers')
  })
}
exports.edit = function ( req, res ) {
  const { id } = req.params
  const foundTeacher = data.teachers.find (function ( teacher ) {
    return teacher.id == id
  })
  if (!foundTeacher) return res.send ('Teacher not found!')
  const teacher = {
    ...foundTeacher,
    birth: date (foundTeacher.birth).iso
  }
  return res.render ('teachers/edit', { teacher })
}
exports.put = function ( req, res ) {
  const { id } = req.body 
  let index = 0 
  const foundTeacher = data.teachers.find (function(teacher, foundIndex) {
    if (id == teacher.id) {
      index = foundIndex 
      return true
    } 
  })
  if (!foundTeacher) return res.send ('Professor não cadastrado')
  const teacher = {
    ...foundTeacher,
    ...req.body, 
    id: Number (id),
    birth: Date.parse(req.body.birth)
  }
  data.teachers[index] = teacher
  fs.writeFile('data.json', JSON.stringify (data, null, 2), function (err) {
    if (err) return res.send ('Write error!')
    return res.redirect (`/teachers/${id}`)
  })
}
exports.delete = function (req, res) {
  const { id } = req.body
  const filteredTeachers = data.teachers.filter (function (teacher) {
    return teacher.id != id 
  })
  data.teachers = filteredTeachers
  fs.writeFile ('data.json', JSON.stringify (data, null, 2), function (err) {
    if (err) return res.send ('Write file error!')
    return res.redirect ('/teachers')
  })
}