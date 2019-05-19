import con from '@db'

const getList = () => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT
      sppt.*
    FROM
      static_posts_plazas_types sppt
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
