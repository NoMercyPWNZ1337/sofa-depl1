import { check } from 'express-validator'

export const productValidators = [
  check('name', 'Назва товару не може бути пуста').notEmpty(),
  check('price', 'Вартість товару не може бути пуста').notEmpty(),
  check(
    'quantityInWarehouse',
    'Кількість товару на складі не може перевищувати 10 штук і не може бути менше нуля'
  ).isInt({ min: 0, max: 10 }),
  check(
    'quantityInDrugstore',
    'Кількість товару в аптеці не може перевищувати 10 штук і не може бути менше нуля'
  ).isInt({ min: 0, max: 10 }),
  check('image', 'Додайте зображення товару').notEmpty(),
  check('category', 'Виберіть категорію').notEmpty(),
]
