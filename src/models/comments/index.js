import con from '@db'

const addOne = (payload = {}) => {
  return new Promise((resolve, reject) => {
    const sql = `
    INSERT INTO
      comments
    SET
      ?
    `
    con.query(sql, payload, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

const updateOne = (id = 0, payload = {}) => {
  return new Promise((resolve, reject) => {
    const injection = [payload, id]
    const sql = `
    UPDATE
      comments
    SET
      ?
    WHERE
      id = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

const deleteOne = (id = 0) => {
  return new Promise((resolve, reject) => {
    const injection = [id]
    const sql = `
    UPDATE
      comments
    SET
      isDeleted = 1
    WHERE
      id = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

const getList = (options = {}) => {
  return new Promise((resolve, reject) => {
    const { refId = 0, refType = 0 } = options
    const injection  = [refId, refType]

    const should = () => {
      const array = [
        'WHERE c.isDeleted = 0',
        'AND c.isPending = 0',
        'AND c.refId = ?',
        'AND c.refType = ?'
      ]

      return array.join(' ')
    }

    const sql = `
    SELECT
      c.id,
      c.content,
      c.userId,
      c.createdDate,
      c.lastModifiedDate,
      u.name AS userName,
      u.majorId AS userMajorId,
      u.email AS userEmail
      
    FROM
      comments c
      
    JOIN
      users u
    ON
      c.userId = u.id
      
    ${should()}
    
    ORDER BY c.createdDate DESC
    `

    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

const getListByUserId = (id = 0, options = {}) => getList({ refId: id, refType: 1, ...options})
const getListByPostId = (id = 0, options = {}) => getList({ refId: id, refType: 2, ...options})

export default {
  addOne,
  updateOne,
  deleteOne,
  getListByUserId,
  getListByPostId
}
