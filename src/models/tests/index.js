import con from '../connection'

// POST tests
const add = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
    INSERT INTO
      tests
    SET
      ?
    `

    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

// GET tests
const get = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT * FROM tests;
    `

    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}


export default {
  add, get
}
