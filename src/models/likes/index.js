import con from '../connection'

const addOne = (injection = {}) => {
  return new Promise((resolve, reject) => {
    const sql = `
    INSERT INTO
      likes
    SET
      ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}


const check = (postId = '', userId = '') => {
  return new Promise((resolve, reject) => {
    const injection = [postId, userId]
    const sql = `
    SELECT
      l.id
    FROM
      likes l
    WHERE
      l.refId = ? AND
      l.userId = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      const likeId = result[0]
      return likeId ? resolve(likeId) : resolve(false)
    })
  })
}

const destroy = (injection = {}) => {
  return new Promise((resolve, reject) => {
    const sql = `
    DELETE
    FROM
      likes
    WHERE
      ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

const getList = (refId = 0) => {
  return new Promise((resolve, reject) => {
    const injection  = [refId]

    const sql = `
    SELECT
      l.userId
    FROM
      likes l
    WHERE
      l.refId = ?
    `

    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

export default {
  addOne,
  check,
  destroy,
  getList
}
