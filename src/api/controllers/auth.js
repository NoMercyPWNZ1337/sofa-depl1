import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'
import Role from '../models/role.js'

export const login = async (req, res) => {
  try {
    const { errors } = validationResult(req)

    if (errors.length) {
      return res.status(400).json({
        message: 'Помилка при авторизації',
        errors,
      })
    }

    const candidate =
      (await User.findOne({ phone: req.body.login })) ||
      (await User.findOne({ email: req.body.login }))

    if (!candidate) {
      return res.status(400).json({
        message: 'Користувача з таким номером телефону або поштою не знайдено',
        success: false,
      })
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      candidate.password
    )

    if (!validPassword) {
      return res.status(400).json({
        message: 'Неправильний e-mail або пароль',
        success: false,
      })
    }

    const token = jwt.sign(
      { roles: candidate.roles, _id: candidate._id },
      process.env.SECRET_TOKEN_KEY,
      { expiresIn: '24h' }
    )

    return res.json({ success: true, token })
  } catch (error) {
    console.log(error)

    res.status(400).json({
      message: 'Помилка при авторизації',
      success: false,
    })
  }
}

export const registration = async (req, res) => {
  try {
    const { errors } = validationResult(req)

    if (errors.length) {
      return res.status(400).json({
        message: 'Помилка при реєстрації',
        errors,
      })
    }

    const candidate =
      (await User.findOne({ phone: req.body.phone })) ||
      (await User.findOne({ email: req.body.email }))

    if (candidate) {
      return res.status(400).json({
        message: 'Користувач з таким номером телефону або поштою вже існує',
        success: false,
      })
    }

    const hashPassword = bcrypt.hashSync(req.body.password, 10)
    const userRole = await Role.findOne({ value: 'user' })
    const user = new User({
      ...req.body,
      password: hashPassword,
      roles: [userRole.value],
    })

    await user.save()

    return res.json({ success: true })
  } catch (error) {
    console.log(error)

    res.status(400).json({
      message: 'Помилка при реєстрації',
      success: false,
    })
  }
}

export const checkAuth = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        message: 'Помилка, ввійдіть в свій аккаунт',
        success: false,
      })
    }

    const decodedData = jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.SECRET_TOKEN_KEY
    )

    const user = await User.findById(decodedData._id, { password: 0 }).exec()

    res.json({ success: true, user })
  } catch (error) {
    console.log(error)

    res.status(400).json({
      message: 'Помилка, ввійдіть в свій аккаунт',
      success: false,
    })
  }
}

export const checkAccess = async function (req, res) {
  const roles = this

  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        message: 'Помилка, ввійдіть в свій аккаунт',
        success: false,
      })
    }

    const { roles: userRoles } = jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.SECRET_TOKEN_KEY
    )

    const hasRole = userRoles.find(role => roles.includes(role))

    if (!hasRole) {
      return res.status(403).json({
        message: 'Помилка, у вас немає доступу',
        success: false,
      })
    }

    res.json({ success: true })
  } catch (error) {
    res.status(400).json({
      message: 'Помилка, у вас немає доступу',
      success: false,
    })
  }
}

export const AuthController = { login, registration, checkAuth, checkAccess }
