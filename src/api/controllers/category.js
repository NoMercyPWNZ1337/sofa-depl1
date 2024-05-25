import Category from '../models/category.js'

const create = async () => {
  try {
    const { errors } = validationResult(req)

    if (errors.length) {
      return res.status(400).json({
        message: 'Помилка при створенні категорії',
        errors,
      })
    }

    const category = new Category({ name: req.body.name })

    await category.save()

    res.json({ success: true, category })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при створенні товару',
      success: false,
    })
  }
}

const update = async () => {
  try {
    const { errors } = validationResult(req)

    if (errors.length) {
      return res.status(400).json({
        message: 'Помилка при оновленні категорії',
        errors,
      })
    }

    await Category.findByIdAndUpdate(
      { _id: req.params.id },
      { name: req.body.name }
    )

    res.json({ success: true })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при оновленні категорії',
      success: false,
    })
  }
}

const remove = async () => {
  try {
    await Category.findOneAndDelete({ _id: req.params.id })

    res.json({ success: true })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при видаленні категорії',
      success: false,
    })
  }
}

const getAll = async () => {
  try {
    const categories = await Category.find().exec()

    return res.json({ success: true, categories })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при полученні категорій',
      success: false,
    })
  }
}

const getOne = async () => {
  try {
    const category = await Category.findById(req.params.id).exec()

    return res.json({ success: true, category })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при полученні категорії',
      success: false,
    })
  }
}

export const CategoryController = { create, update, remove, getAll, getOne }
