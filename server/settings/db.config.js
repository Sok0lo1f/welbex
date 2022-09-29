const mysql = require('mysql2/promise')

const connect = async () => {
    return await mysql.createConnection({
        host: 'sql11.freemysqlhosting.net',
        port: 3306,
        user: 'sql11522951',
        password: 'LY4IQTdTi7',
        database: 'sql11522951',
    })
}

module.exports = connect
