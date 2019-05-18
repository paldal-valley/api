import con from '../connection'

// POST: Q&A 게시판에 글 작성
const add = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
    INSERT INTO
      sandbox.posts_questions
    
    `

    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)
      // console.log(rows)
      return resolve(result)
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
    con.query(sql, (err, result) => {
      if (err) return reject(err)
      return resolve(result)
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
