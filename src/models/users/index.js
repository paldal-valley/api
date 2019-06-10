import con from '../connection'
import auth from '../../middlewares/auth/index'

// POST USER
const add = injection => {
  return new Promise(async (resolve, reject) => {
    const sql = `
    INSERT INTO
      users
    SET
      ?
    `
    try{
      injection.password = await password_encrypt(injection.password);
    } catch (err) {
      reject(err)
    }

    con.query(sql, injection, (err, result) => {
      if (err){
        if ('code' in err) return resolve(err.code)
        return reject(err)
      }

      return resolve(result)
    })
  })
}

// LOGIN
const login = information => {
  return new Promise(async (resolve, reject) => {
    const sql = `
    SELECT * FROM
     users
    WHERE
      userId = ?
    `
    con.query(sql, information.userId, async (err, result) => {
      if (err){
        if ('code' in err) return resolve(err.code)
        return reject(err)
      }
      const user_info = JSON.parse(JSON.stringify(result))
      console.log(user_info)
      try{
        if(user_info.length == 0) return reject() // id 틀렸을 때
        var check = await password_check(information.password, user_info[0].password)
      } catch (err) {
        return reject(err)
      }
      if(check) {
        const accessToken = auth.signToken(user_info[0].userId);
        return resolve({ accessToken, userName: user_info[0].userName, id: `${user_info[0].id}` });
      }
      return reject(); //password 틀렸을 때
    })
  })
}

// email duplication check
const email_dup_check = information => {
  return new Promise(async (resolve, reject) => {
    const sql = `
    SELECT * FROM
     users
    WHERE
      email = ?
    `
    con.query(sql, information.email, async (err, result) => {
      if (err){
        if ('code' in err) return resolve(err.code)
        return reject(err)
      }
      try{
        const user_info = JSON.parse(JSON.stringify(result))
        if(user_info.length == 0) return resolve() // email ok
        return reject("email_dup")
      } catch (err) {
        return reject(err)
      }
    })
  })
}

const getOne = (id = 0) => {
  return new Promise((resolve, reject) => {
    const injection = [id]
    const sql = `
    SELECT 
      * 
    FROM
      users
    WHERE
      id = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)
      return resolve(result[0])
    })
  })
}

const getOneByEmail = (email = '') => {
  return new Promise((resolve, reject) => {
    const injection = [email]
    const sql = `
    SELECT
      u.id,
      u.email,
      u.name,
      u.password,
      u.walletAddress,
      u.majorId
    FROM
      users u
    WHERE
      u.email = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result[0])
    })
  })
}

const addOne = (injection = {}) => {
  return new Promise((resolve, reject) => {
    const sql = `
    INSERT INTO
      users
    SET
      ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

const emailDupCheck = (email = '') => {
  return new Promise((resolve, reject) => {
    if (!email) reject(Error('email is empty'))

    const injection = [email]
    const sql = `
    SELECT
      COUNT(u.email) AS existence
    FROM
      users u
    WHERE
      u.email = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      const existence = result[0].existence
      return !existence ? resolve(true) : reject(Error('email already exist'))
    })
  })
}

const emailCheck = (email = '') => {
  return new Promise((resolve, reject) => {
    if (!email) reject(Error('email is empty'))

    const injection = [email]
    const sql = `
    SELECT
      COUNT(u.email) AS existence
    FROM
      users u
    WHERE
      u.email = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      const existence = result[0].existence
      return existence ? resolve(true) : reject(Error('email doesnt exist'))
    })
  })
}

const updateOne = (userId = '', payload = {}) => {
  return new Promise((resolve, reject) => {
    if(!userId) reject(Error('email is empty'))
    const injection = [payload, userId]
    const sql = `
    UPDATE
      users u
    SET
      ?
    WHERE
      u.id = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

const updateOnebyToken = (token = '', resetPasswordExpires = '0000-00-00 00:00:00', payload) => {
  return new Promise((resolve, reject) => {
    const injection = [payload, token, resetPasswordExpires]
    const sql = `
    UPDATE
      users u
    SET
      ?
    WHERE
      u.resetPasswordToken = ? AND u.resetPasswordExpires >= ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)
      if (!result.changedRows) return reject(Error('Matched User is NULL'))
      return resolve(result)
    })
  })
}

export default {
  add,
  login,
  email_dup_check,
  addOne,
  getOne,
  getOneByEmail,
  emailDupCheck,
  emailCheck,
  updateOne,
  updateOnebyToken
}
