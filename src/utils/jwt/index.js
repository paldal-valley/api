import jwt from 'jsonwebtoken'

const createToken = (payload = {}) => {
  if (!Object.keys(payload).length) throw Error('payload is empty')

  const secret = process.env.JWT_SECRET_KEY
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

const verifyToken = async (token = '') => {
  // 토큰 없을 시 다음 미들웨어로 넘김
  if (!token) return

  const secret = process.env.JWT_SECRET_KEY
  return await jwt.verify(token, secret)
}

export default {
  createToken,
  verifyToken
}
