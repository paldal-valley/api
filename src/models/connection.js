import mysql from 'mysql'

const isProduction = process.env.NODE_ENV === 'production'

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE_PRODUCTION,
  MYSQL_DATABASE_DEVELOPMENT
} = process.env

const config = {
  host: MYSQL_HOST,
  port: MYSQL_PORT || '3306',
  user: MYSQL_USER || 'root',
  password: MYSQL_PASSWORD || 'password',
  database: isProduction ? MYSQL_DATABASE_PRODUCTION : MYSQL_DATABASE_DEVELOPMENT,
  multipleStatements: true,
  timezone: 'utc'
}

const connection = mysql.createConnection(config)

connection.connect(err => {
  if (err) return console.error('\nError occurred connecting database.', err)
  console.log(`\nDatabase '${connection.config.database}' is connected.`)
})
// const sql = 'SELECT * FROM sandbox.static_majors'
// connection.query(sql, (err, results, field) => {
//   console.log(results);
// })

export default connection
