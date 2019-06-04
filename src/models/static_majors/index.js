import con from '@db'

const getList = () => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT
      sm.*
    FROM
      static_majors sm
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

export default {
  getList
}
