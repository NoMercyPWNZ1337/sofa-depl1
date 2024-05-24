import jwt from 'jsonwebtoken'

const roleMiddleware = roles => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') next()

    try {
      const token = (req.headers.authorization || '').split(' ')[1]

      if (!token) {
        return res.status(403).json({
          message: 'Помилка, ввійдіть в свій аккаунт',
          success: false,
        })
      }

      const { roles: userRoles } = jwt.verify(
        token,
        process.env.SECRET_TOKEN_KEY
      )

      const hasRole = userRoles.find(role => roles.includes(role))

      if (!hasRole) {
        return res.status(403).json({
          message: 'Помилка, у вас немає доступу',
          success: false,
        })
      }

      next()
    } catch (error) {
      console.log(error)

      return res.status(403).json({
        message: 'Помилка, ввійдіть в свій аккаунт',
        success: false,
      })
    }
  }
}

export default roleMiddleware
