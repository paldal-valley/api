import con from '@db'

const getList = (options = {}) => {
  return new Promise((resolve, reject) => {
    const { limit = 5 } = options
    const injection = [Number(limit)]

    const sql = `
    SELECT
      p.id,
      p.title,
      p.content,
      p.view,
      p.recommended
    FROM
      posts_plazas pp
    LEFT JOIN
      posts p
    ON
      p.id = pp.postId
    
    ORDER BY p.createdDate DESC
    
    LIMIT ?
    `
    con.query(sql, injection ,(err, result) => {
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
