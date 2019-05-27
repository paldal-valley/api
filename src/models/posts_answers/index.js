import con from '../connection'

// POST: Q&A 게시판에 글 작성
const addOne = (payload = {}) => {
  return new Promise((resolve, reject) => {
    const sql = `
    INSERT INTO
      posts_answers
    SET
      ?
    `
    con.query(sql, payload, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

// GET tests
const getOne = (id = 0, options = {}) => {
  return new Promise((resolve, reject) => {
    const injection = [id]
    const sql = `
    SELECT
      p.id,
      p.title,
      p.content,
      p.recommended,
      pq.categoryId,
      u.id AS userId,
      u.name AS userName,
      u.majorId AS userMajorId,
      u.email AS userEmail,
      DATE_FORMAT(p.createdDate, "%Y. %m. %d / %h:%i %p") AS createdDate
    FROM
      posts_answers pq
    JOIN
      posts p
    ON
      pq.postId = p.id
    JOIN
      users u
    ON
      u.id = p.userId
      
    WHERE
      p.id = ? AND
      p.isDeleted = 0 AND
      p.isPending = 0
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      if (result[0]) return resolve(result[0])
      return resolve({})
    })
  })
}

const updateOne = (id = 0, payload = {}) => {
  return new Promise((resolve, reject) => {
    const injection = [payload, id]
    const sql = `
    UPDATE
      posts_questions
    SET
      ?
    WHERE
      postId = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

const getList = (options = {}) => {
  return new Promise((resolve, reject) => {
    const { limit = 5, postId_Q = 0 } = options
    const should = () => {
      const array = ['WHERE p.isDeleted = 0', 'AND p.isPending = 0']
      if (postId_Q) array.push('AND pa.postId_Q = ?')

      return array.join(' ')
    }

    const injection = []

    if (postId_Q) injection.push(Number(postId_Q))

    injection.push(Number(limit))

    const sql = `
    SELECT
      p.id,
      p.content,
      p.view,
      p.recommended,
      u.id AS userId,
      u.name AS userName,
      u.majorId AS userMajorId,
      u.email AS userEmail,
      DATE_FORMAT(p.createdDate, "%Y. %m. %d / %h:%i %p") AS createdDate
    FROM
      posts_answers pa
    JOIN
      posts p
    ON
      p.id = pa.postId
    JOIN
      users u
    ON
      u.id = p.userId
      
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



export default {
  addOne,
  getOne,
  getList,
  updateOne
}
