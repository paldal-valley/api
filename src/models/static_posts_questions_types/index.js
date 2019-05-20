import con from '@db'

const getList = () => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT
      spqt.*
    FROM
      static_posts_questions_types spqt
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
