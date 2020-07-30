
exports.age = function ( timestamp ) {
  const today = new Date ()
  const birthDate = new Date ( timestamp )
  let age = today.getFullYear () - birthDate.getFullYear ()
  const month = today.getMonth () - birthDate.getMonth ()
  if (month < 0 || month == 0 && today.getDate () < birthDate.getDate ()) age = age - 1
  return age
}
exports.date = function ( timestamp ) {
  const date = new Date ( timestamp )

  const year = date.getUTCFullYear ()
  const month = `0${date.getUTCMonth () + 1}`.slice (-2)
  const day = `0${date.getUTCDate ()}`.slice (-2)

  return {
    day,
    month,
    year,
    iso: `${year}-${month}-${day}`,
    birthDay: `${day}/${month}`,
    format: `${day}/${month}/${year}`
  }
}
exports.grade = function ( grade ) {
  if (grade == '5f') return '5º ano do ensino fundamental'
  if (grade == '6f') return '6º ano do ensino fundamental'
  if (grade == '7f') return '7º ano do ensino fundamental'
  if (grade == '8f') return '8º ano do ensino fundamental'
  if (grade == '9f') return '9º ano do ensino fundamental'
  if (grade == '1m') return '1º ano do ensino médio'
  if (grade == '2m') return '2º ano do ensino médio'
  if (grade == '3m') return '3º ano do ensino médio'
}