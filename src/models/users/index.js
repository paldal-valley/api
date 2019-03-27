import con from '../connection'

// POST tests
const add = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
    INSERT INTO
      userss
    SET
      ?
    `

    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

export default {
  add
}
