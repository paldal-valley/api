import con from '../connection'

// POST: Q&A 게시판에 글 작성
const add = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
    INSERT INTO
      sandbox.posts_answers
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
      SELECT * FROM sandbox.posts_answers;
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)
      return resolve(result)
    })
  })
}

// GET menber tests
const search = payload => {
  return new Promise((resolve, reject) => {
    const { id: postId } = payload
    const injection = [postId]
    const sql = `
    SELECT
     p.id,
     p.title,
     p.content,
     DATE_FORMAT(p.createdDate, "%Y. %m. %d") AS createdDate
   FROM
     posts_answers pa
   LEFT JOIN
     posts p
   ON
     p.id = pa.postsId
   WHERE
     pa.postId_Q = ?
     ;
    `

    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

export default {
  add, get, search
}
