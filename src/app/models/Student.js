const db = require ( '../../config/db' )
const { date, grade } = require ('../../lib/utils')

module.exports = {
    all ( callback ) {
        db.query ( `SELECT * FROM students ORDER BY name ASC`, function ( err, results ) {
            const newValueStudent = []
            for ( student of results.rows ) {
                const students = {
                    ...student,
                    education_level: grade ( student.education_level )
                }
                newValueStudent.push ( students )
            }
            callback ( newValueStudent )
        })
    },
    create ( data, callback ) {
        const query = `
            INSERT INTO students (
                name,
                avatar_url,
                email,
                education_level,
                birth_date,
                grade,
                teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.education_level,
            date (data.birth_date).iso,
            data.grade,
            data.teacher
        ]
        db.query ( query, values, function ( err, results ) {
            if ( err ) throw `Database error! ${ err }`
            callback ( results.rows[0] )
        })
    },
    find ( id, callback ) {
        db.query ( `
            SELECT students.*, teachers.name AS teacher_name 
            FROM students
            LEFT JOIN teachers ON ( students.teacher_id = teachers.id ) 
            WHERE students.id = $1`, [id], function ( err, results ) {
            if ( err ) throw `Database ${ err }`
            callback ( results.rows[0] )          
        })
    },
    update ( data, callback ) {
        const query = `
            UPDATE students SET
                name = ( $1 ),
                avatar_url = ( $2 ),
                email = ( $3 ),
                education_level = ( $4 ),
                birth_date = ( $5 ),
                grade = ( $6 ),
                teacher_id = ( $7 )
            WHERE id = $8
        `
        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.education_level,
            data.birth_date,
            data.grade,
            data.teacher,
            data.id
        ]
        db.query ( query, values, function ( err, results ) {
            if ( err ) throw `Database ${ err }`
            callback ()
        }) 
    },
    delete ( id, callback ) {
        db.query ( `
            DELETE 
            FROM students
            WHERE id = $1`, [id], function ( err, results ) {
                if ( err ) throw `Database ${ err }`
                callback () 
            })
    },
    teachersSelectOptions ( callback ) {
        db.query ( `SELECT name, id FROM teachers`, function ( err, results ) {
            if ( err ) throw `Database ${ err }`
            callback ( results.rows )
        })
    },
    paginate ( params ) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count (*) 
                FROM students 
            ) AS total`

        if ( filter ) {
            filterQuery = `
                WHERE students.name ILIKE '%${ filter }%'
                OR students.email ILIKE '%${ filter }%'
            `
            totalQuery = `(
                SELECT count (*)
                FROM students
                ${ filterQuery }
            ) AS total`
        }

        query = `
            SELECT students.*, ${ totalQuery }
            FROM students 
            ${ filterQuery }
            LIMIT $1 OFFSET $2 
        `
        db.query ( query, [ limit, offset ], ( err, results ) => {
            if ( err ) throw `Database Error! ${ err }`
            callback ( results.rows ) 
        })
    }    
}