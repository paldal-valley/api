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
      p.view,
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


const getPostSelected = (id = 0) => {
  return new Promise((resolve, reject) => {
    const injection = [id]
    const sql = `
    SELECT 
      pa.isSelected
    FROM 
      posts_answers as pa
    WHERE 
      postId_Q = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

// answer를 먼저 조이하고. 
//여기서 category id처럼 채택 여부를 받아
//injection.push(Number(isSelected)) // 하면 0, 1 두개 중 하나 드러간다.

//is Selected를 0, 1, 2로 두는데 0은 전체 섞어서, 1은 채택 된것만 2는 채택 안된 것만.
//dafualt를 null로 주고
//null이 아니면 injection과 should 안에 있는 array push를 추가하도록.
//

const getList = (options = {}) => {
  return new Promise((resolve, reject) => {
    //option get으로 하면 쿼리로 들어감. 옵션에 is Selected = 0 추가해주고
    const { limit = 5, categoryId = 0, isSelected = null } = options
    const should = () => {
      const array = ['WHERE p.isDeleted = 0', 'AND p.isPending = 0']
      if (categoryId) array.push('AND pq.categoryId = ?')
      if (isSelected != null) array.push('AND pa.isSelected=?')
        //if(isSelected) arrya.push('AND pa.isSelected=?')
      return array.join(' ')
    }

    const injection = []

    if (categoryId) injection.push(Number(categoryId))
      //여기다가 isSelected push
    if (isSelected) injection.push(Number(isSelected))
    injection.push(Number(limit))

    //post answer 조인하고
    const sql = `
    SELECT
      p.id,
      p.title,
      p.content,
      p.view,
      p.recommended,
      pq.reward,
      pq.categoryId,
      pa.isSelected AS selected,
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
    LEFT JOIN
      posts_answers pa
    ON
      pq.id = pa.postId_Q
    JOIN
      users u
    ON
      u.id = p.userId
    LEFT JOIN
      (
        SELECT
            refId AS postId
        FROM
            comments
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

const getUnselectedList = (options = {}) => {
  return new Promise((resolve, reject) => {
    //option get으로 하면 쿼리로 들어감. 옵션에 is Selected = 0 추가해주고
    const { limit = 10, categoryId = 0, isSelected = null } = options
    const should = () => {
      const array = ['WHERE p.isDeleted = 0', 'AND p.isPending = 0']
      if (categoryId) array.push('AND pq.categoryId = ?')
      if (isSelected != null) array.push('AND pa.isSelected=?')
        //if(isSelected) arrya.push('AND pa.isSelected=?')
      return array.join(' ')
    }

    const injection = []

    if (categoryId) injection.push(Number(categoryId))
      //여기다가 isSelected push
    if (isSelected) injection.push(Number(isSelected))
    injection.push(Number(limit))

    //post answer 조인하고
    const sql = `
    SELECT
      p.id,
      p.title,
      p.content,
      pq.reward,
      pq.categoryId
    FROM
      posts_questions pq
    JOIN
      posts p
    ON
      p.id = pq.postId
    LEFT JOIN
      posts_answers pa
    ON
      pq.id = pa.postId_Q AND
      pa.isSelected <> 1
        
      
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
  getUnselectedList,
  updateOne,
  getPostSelected
}
