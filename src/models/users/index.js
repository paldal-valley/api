import con from '../connection'
import bcrypt from 'bcrypt-nodejs'
import auth from '../../middlewares/auth/index'

//해시 알고리즘 적용 횟수
var SALT_FACTOR = 5;

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
      try{
        if(user_info.length == 0) return reject() // id 틀렸을 때
        var check = await password_check(information.password, user_info[0].password)
      } catch (err) {
        return reject(err)
      }
      if(check) {
        const accessToken = auth.signToken(user_info[0].userId);
        return resolve({ accessToken: accessToken, userId: user_info[0].userId });
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


const password_encrypt = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
      if (err) {
          return reject(err);
      }
      bcrypt.hash(password, salt, ()=>{}, function (err, hashedPassword) {
          if (err) {
              return reject(err);
          }
          return resolve(hashedPassword);
      });
    });
  })
}

const password_check = (guess_password, real_password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(guess_password, real_password, function (err, isMatch) {
      if(err) return reject(err)
      return resolve(isMatch)
    });
  })
}

export default {
  add, login, email_dup_check
}
