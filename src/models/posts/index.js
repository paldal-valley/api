import con from '../connection'

// POST: Q&A 게시판에 글 작성
const addOne = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
    INSERT INTO
      posts
    SET
      ?
    `
    con.query(sql, injection, (err, rows, fields) => {
      if (err) return reject(err)
      // console.log(rows)
      return resolve(rows)
    })
  })
}

// GET tests
const getOne = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        * 
      FROM 
        posts;
    `
    // con.query(sql, (err, result) => {
    //   if (err) return reject(err)
    //   return resolve(result)
    // })
    con.query(sql, (err, rows, fields) => {
      if (err) return reject(err)
      return resolve(rows)
    })
  })
}

// GET menber tests
const search = memv => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT * FROM tests;
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
      posts
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

export default {
  addOne,
  getOne,
  deleteOne,
  updateOne
}