const authentication = (req, res, next) => {
  console.log('Cookies??? ', req.signedCookies)
  if (!req.signedCookies.user) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      res.setHeader('WWW-Authenticate', 'Basic')
      const message = 'Authorization header not set'
      authError(next, message, 401)
    } else {
      const auth = Buffer.from(authHeader.split(' ')[1], 'base64')
      const credentials = auth.toString().split(':')

      // Assuming username is 'admin' and password is 'password'
      if (credentials[0] === 'admin' && credentials[1] === 'password') {
        res.cookie('user', 'admin', { signed: true })
        next()
      } else {
        // Provided credintials are not correct
        res.setHeader('WWW-Authenticate', 'Basic')
        const message = 'Either user name or password is not correct. Try again'
        authError(next, message, 401)
      }
    }
  } else {
    if (req.signedCookies.user === 'admin') {
      next()
    } else {
      res.setHeader('WWW-Authenticate', 'Basic')
      const message = 'User does not have correct credentials'
      authError(next, message, 403)
    }
  }

}

const authError = (next, message, errorcode) => {
  const error = new Error(message)
  error.status = errorcode
  return next(error)
}

module.exports = { authentication, authError }