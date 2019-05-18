import con from '@db'

const getList = () => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT
      p.title,
      p.view,
      p.recommended
    FROM
      posts_plazas pp  
    LEFT JOIN
      posts p
    ON
      p.id = pp.postId
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

const getOne = (id = 0, options = {}) => {
  return new Promise((resolve, reject) => {
     // const sql =
  })
}

export default {
  getList
}
