import con from '../connection'

// POST: Q&A 게시판에 글 작성
const add = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
    INSERT INTO
      sandbox.posts
    SET
      ?
    `

    // con.query(sql, injection, (err, result) => {
    //   if (err) return reject(err)
    //   // console.log(rows)
    //   return resolve(result)
    // })
    con.query(sql, injection, (err, rows, fields) => {
      if (err) return reject(err)
      // console.log(rows)
      return resolve(rows)
    })
  })
}




// GET tests
const get = () => {
  return new Promise((resolve, reject) => {
    const sql = 
    `
      SELECT * FROM posts;
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

export default {
  add, get
}
