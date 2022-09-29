'use strict'

const connect = require('../settings/db.config')

//QUERY PARAMS
//  page: string
//  name: string
//  amount: string,
//  date: string,
//  distance: string,
//  type: equal | has | more | less

//RETURN {
//          page: number
//          pages: number
//          data: array
// }
exports.travels = async (req, res) => {
    const { page = 1, name, amount, date, distance, type } = req.query
    const _LIMIT = 5
    let _query = `FROM test_table`

    let values = []

    if (type) {
        let isWhere = true
        if (name) {
            _query = `${_query} WHERE name `
            values.push(name)
        } else if (amount) {
            _query = `${_query} WHERE amount `
            values.push(amount)
        } else if (date) {
            _query = `${_query} WHERE date `
            values.push(date)
        } else if (distance) {
            _query = `${_query} WHERE distance `
            values.push(distance)
        } else isWhere = false

        if (isWhere)
            switch (type) {
                case 'equal':
                    _query = `${_query} = ? `
                    break
                case 'less':
                    _query = `${_query} < ? `
                    break
                case 'more':
                    _query = `${_query} > ? `
                    break
                case 'has':
                    _query = `${_query} LIKE ? `
                    values = [`%${values[0]}%`]
                    break
                default:
                    break
            }
    }
    const count_query = `SELECT COUNT(*) ${_query}`
    const count_values = [...values]

    _query = `SELECT * ${_query} LIMIT ?,?`
    values = [...values, (page - 1) * _LIMIT, _LIMIT]

    try {
        const db = await connect()
        const [count] = await db.execute(count_query, count_values)
        const [rows] = await db.execute(_query, values)

        const response = {
            page: +page,
            pages: Math.ceil(count[0]['COUNT(*)'] / _LIMIT),
            data: rows,
        }
        db.end()
        res.json(response)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
