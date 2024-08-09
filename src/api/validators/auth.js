import { check } from 'express-validator'

export const loginValidators = [
  check('login', 'Телефон або E-mail не може бути пустим').notEmpty(),
  check(
    'password',
    'Пароль не може бути коротше 10 символів, і не більше 20 символів'
  ).isLength({ max: 20, min: 10 }),
]

export const registrationValidators = [
  check('name', 'Імя не може бути коротше 3 символів').isLength({
    min: 3,
  }),
  check('lastName', 'Прізвище не може бути коротше 3 символів').isLength({
    min: 3,
  }),
  check('email', 'Введіть коректний E-mail').isEmail(),
  check('phone', 'Введіть коректний номер телефону - 10 цифер').isLength({
    min: 10,
    max: 10,
  }),
  check(
    'password',
    'Пароль не може бути коротше 10 символів, і не більше 20 символів'
  ).isLength({ max: 20, min: 10 }),
]
