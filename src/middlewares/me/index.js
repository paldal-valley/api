import jwt from '@utils/jwt'

export default async (req, res, next) => {
  const token = req.headers['x-access-token']

  try {
    // 비로그인 상태일 경우 req.me 는 undefined
    req.me = await jwt.verifyToken(token)
    next()
  } catch (err) {
    next(err)
  }
}
