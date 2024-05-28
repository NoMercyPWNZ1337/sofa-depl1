import { check } from 'express-validator'

export const underCategoryValidators = [
  check('name', 'Назва підкатегорії не може бути пуста').notEmpty(),
  check('categoryId', 'Виберіть категорію').notEmpty(),
]
