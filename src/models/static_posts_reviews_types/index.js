import con from '@db'

const getList = () => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT
      sprt.*
    FROM
      static_posts_reviews_types sprt
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
