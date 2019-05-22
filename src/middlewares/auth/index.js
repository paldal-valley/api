const isLoggedIn = (req, res, next) => {
  if (typeof req.me === 'undefined') {
    next(Error('User not logged in'))
  } else {
    next()
  }
}

export {
  isLoggedIn
}
