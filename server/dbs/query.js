import dbConfig from './config'
const mysql = require('mysql')

// mysql
const pool = mysql.createPool(dbConfig.dbs)

// query sql语句入口
export const query = (sql, val) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, val, (err, results, fields) => {
          if (err) reject(err)
          else resolve(results)
          connection.release()
        })
      }
    })
  })
}
