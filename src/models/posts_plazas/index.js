import con from '@db'

const getList = (options = {}) => {
  return new Promise((resolve, reject) => {
    const { limit = 5, category = 0 } = options
    const should = () => {
      const array = ['WHERE p.isDeleted = 0', 'AND p.isPending = 0']
      if (category) array.push('AND pp.category = ?')

      return array.join(' ')
    }

    const injection = []

    if (category) injection.push(Number(category))

    injection.push(Number(limit))

    const sql = `
    SELECT
      p.id,
      p.title,
      p.content,
      p.view,
      p.recommended,
      DATE_FORMAT(p.createdDate, "%Y. %m. %d") AS createdDate
    FROM
      posts_plazas pp
    LEFT JOIN
      posts p
    ON
      p.id = pp.postId
    
    ${should()}
    
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
    const injection = [id]
    const sql = `
    SELECT
      p.id,
      p.title,
      p.content,
      p.recommended,
      DATE_FORMAT(p.createdDate, "%Y. %m. %d") AS createdDate
    FROM
      posts p
    WHERE
      p.id = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result[0])
    })
  })
}

export default {
  getOne,
  getList
}
