import con from '../connection'

// POST: Q&A 게시판에 글 작성
const add = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
    INSERT INTO
      sandbox.posts_questions
    SET
      ?
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

// // GET tests
// const get2 = () => {
//   return new Promise((resolve, reject) => {
//     const sql = `
//     SELECT * FROM 
//       sandbox.posts;
//     WHERE 
//       id=74`
//     con.query(sql, (err, result) => {
//       if (err) return reject(err)
//       return resolve(result)
//     })
//   })
// }

// GET menber tests
const search = payload => {
  return new Promise((resolve, reject) => {
    const { id: postId } = payload
    const injection = [postId]
    const sql = `
    SELECT * FROM 
      sandbox.posts
    WHERE 
      id= ?`
    //con.query(sql, injection, (err, result)
    con.query(sql, injection,(err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

export default {
  add, get, search
}
