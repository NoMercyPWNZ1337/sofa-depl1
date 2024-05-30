import { validationResult } from 'express-validator'

import User from '../models/user.js'

const update = async (req, res) => {
  try {
    const { errors } = validationResult(req)

    if (errors.length) {
      return res.status(400).json({
        message: 'Помилка при оновленні даних користувача',
        errors,
      })
    }

    await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
      }
    )

    res.json({ success: true })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при оновленні даних користувача',
      success: false,
    })
  }
}

export const UserController = { update }
