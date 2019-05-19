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
      DATE_FORMAT(p.createdDate, "%Y. %m. %d") AS createdDate
    FROM
      posts p
    WHERE
      p.id = ? AND
      p.isDeleted = 0 AND
      p.isPending = 0
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result[0])
    })
  })
}

// GET menber tests
const search = memv => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT 
      * 
    FROM 
      tests;
    `

    con.query(sql, (err, result) => {
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
      posts p
    SET
      p.isDeleted = 1
    WHERE
      p.id = ?
    `
    con.query(sql, injection, (err, result) => {
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
      posts_questions
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

const getList = (options = {}) => {
  return new Promise((resolve, reject) => {
    const { limit = 5, category = 0 } = options
    const should = () => {
      const array = ['WHERE p.isDeleted = 0', 'AND p.isPending = 0']
      if (category) array.push('AND pq.category = ?')

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
      posts_questions pq
    LEFT JOIN
      posts p
    ON
      p.id = pq.postId
    
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
