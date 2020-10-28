const jwt = require('jsonwebtoken')
const secret = require('../config/secret')

exports.isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, secret.secret)
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken._id,
      role: decodedToken.role,
    }
    if (req.userData.role == 'admin') {
      next()
    } else {
      res.status(403).json({ message: 'unauthaurazied' })
    }
  } catch (error) {
    res.status(401).json({ message: 'auth failed' })
  }
}
