export default (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    // TODO: 슬랙에 error log 보내는 로직 추가할 것 (모니터링)
  } else {
    console.error(err)
  }

  return res.status(err.status || 500).json({
    success: false,
    msg: err.message || 'Internal Server Error',
    code: err.code || 0
  })
}
