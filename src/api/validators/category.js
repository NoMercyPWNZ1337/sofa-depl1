import { check } from 'express-validator'

export const categoryValidators = [
  check('name', 'Назва категорії не може бути пуста').notEmpty(),
]
