import con from '../connection'

// POST: Q&A 게시판에 글 작성
const addOne = (payload = {}) => {
  return new Promise((resolve, reject) => {
    const sql = `
    INSERT INTO
      posts_questions
    SET
      ?
    `
    con.query(sql, payload, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

const getOneByPostQuestion = (id = 0) => {
  return new Promise((resolve, reject) => {
    const injection = [id]
    const sql = `
    SELECT
      *
    FROM
      posts_questions pq
    WHERE
      pq.id = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      if (result[0]) return resolve(result[0])
      return resolve({})
    })
  })
}

// GET tests
const getOne = (id = 0, options = {}) => {
  return new Promise((resolve, reject) => {
    const injection = [id]
    const sql = `
    SELECT
      pq.id,
      p.title,
      p.content,
      p.recommended,
      pq.reward,
      pq.categoryId,
      pq.reward,
      u.id AS userId,
      u.name AS userName,
      u.majorId AS userMajorId,
      u.email AS userEmail,
      DATE_FORMAT(p.createdDate, "%Y. %m. %d / %h:%i %p") AS createdDate
    FROM
      posts_questions pq
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
    const { limit = 5, categoryId = 0 } = options
    const should = () => {
      const array = ['WHERE p.isDeleted = 0', 'AND p.isPending = 0']
      if (categoryId) array.push('AND pq.categoryId = ?')

      return array.join(' ')
    }

    const injection = []

    if (categoryId) injection.push(Number(categoryId))

    injection.push(Number(limit))

    const sql = `
    SELECT
      p.id,
      p.title,
      p.content,
      p.view,
      p.recommended,
      pq.reward,
      pq.categoryId,
      u.id AS userId,
      u.name AS userName,
      u.majorId AS userMajorId,
      u.email AS userEmail,
      COUNT(covering.postId) AS totalComment,
      DATE_FORMAT(p.createdDate, "%Y. %m. %d / %h:%i %p") AS createdDate
    FROM
      posts_questions pq
    JOIN
      posts p
    ON
      p.id = pq.postId
    JOIN
      users u
    ON
      u.id = p.userId
    LEFT JOIN
      (
        SELECT
            refId AS postId
        FROM
            sandbox.comments
        WHERE
            refType = 2 AND
            isDeleted <> 1
      ) AS covering
    ON
      covering.postId = p.id
      
    ${should()}
    
    GROUP by p.id
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
  getOneByPostQuestion,
  getList,
  updateOne
}
