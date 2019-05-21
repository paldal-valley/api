import jwt from '@utils/jwt'

export default async (req, res, next) => {
  const token = req.headers['x-access-token'] || req.body.token || req.query.token

  try {
    req.decoded = await jwt.verifyToken(token)
    next()
  } catch (err) {
    next(err)
  }
}
