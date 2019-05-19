import con from '../connection'

// GET tests
const get = () => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT * FROM static_majors;
    `

    con.query(sql, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

export default {
  get
}
