import { check } from 'express-validator'

export const productValidators = [
  check('name', 'Назва товару не може бути пуста').notEmpty(),
  check('price', 'Вартість товару не може бути пуста').notEmpty(),
  check(
    'quantityInDrugstore',
    'Кількість товару в аптеці не може перевищувати 10 штук і не може бути менше нуля'
  ).isInt({ min: 0, max: 10 }),
  check('image', 'Додайте зображення товару').notEmpty(),
  check('underCategoryId', 'Виберіть підкатегорію').notEmpty(),
  check(
    'description',
    'Опис не товару не може бути менше 100 симоволів'
  ).isLength({ min: 100 }),
  check('manufacturer', 'Вкажіть виробника товару').notEmpty(),
  check('manufacturerCountry', 'Вкажіть країну виробництва').notEmpty(),
  check(
    'withRecipe',
    'Вкажіть продаж товару за рецептом чи без рецепту'
  ).notEmpty(),
]
