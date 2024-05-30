import { check } from 'express-validator'

export const userValidators = [
  check('name', 'Імя не може бути коротше 3 символів').isLength({
    min: 3,
  }),
  check('lastName', 'Прізвище не може бути коротше 3 символів').isLength({
    min: 3,
  }),
  check('email', 'Введіть корректний E-mail').isEmail(),
  check('phone', 'Введіть корректний номер телефону - 10 цифер').isLength({
    min: 10,
    max: 10,
  }),
]
