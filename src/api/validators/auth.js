import { check } from 'express-validator'

export const loginValidators = [
  check('login', 'Телефон або E-mail не може бути коротше 7 символів').isLength(
    { min: 7 }
  ),
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
  check('email', 'Введіть корректний E-mail').isEmail(),
  check('phone', 'Номер телефону не може бути менше 10 цифр').isLength({
    min: 10,
  }),
  check(
    'password',
    'Пароль не може бути коротше 10 символів, і не більше 20 символів'
  ).isLength({ max: 20, min: 10 }),
]
