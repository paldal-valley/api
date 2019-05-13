import con from '../connection'

// POST tests
const add = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
    INSERT INTO sandbox.posts 
      
    VALUES('1', '26', '하이', 'that's nono', '3', '3', '2019', '2019', '1', '0');
      

    `

    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)
      console.log(rows)
      return resolve(result)
    })
  })
}

// GET tests
const get = () => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT * FROM sandbox.static_majors WHERE id='0';
    `
    // WHERE id='0'
    // con.query(sql, (err, result) => {
    //   if (err) return reject(err)

    //   return resolve(result)
    // })
    con.query(sql, function(err, rows, fields) {
      if (err) return reject(err)
      console.log(rows)
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
