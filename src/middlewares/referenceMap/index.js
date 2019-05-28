const refParams = [
  'userId',
  'postId'
]

export default (req, res, next) => {
  for (const [idx, param] of refParams.entries()) {
    if (typeof req.params[param] !== 'undefined') {
      req.params.refId = req.params[param]
      req.params.refType = idx + 1
      break
    }
  }
  if (typeof req.params.refId === 'undefined')
    next(Error('No RefType matched'))
  next()
}
