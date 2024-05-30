import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') next()

  try {
    const token = (req.headers.authorization || '').split(' ')[1]

    if (!token) {
      return res.status(403).json({
        message: 'Помилка, ввійдіть в свій аккаунт',
        success: false,
      })
    }

    const decodedData = jwt.verify(token, process.env.SECRET_TOKEN_KEY)

    req.user = decodedData

    next()
  } catch (error) {
    console.log(error)

    return res.status(403).json({
      message: 'Помилка, ввійдіть в свій аккаунт',
      success: false,
    })
  }
}

export default authMiddleware
