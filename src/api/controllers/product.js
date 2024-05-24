import Product from '../models/product.js'

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().exec()

    return res.json({ success: true, products })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Невідома помилка при полученні товарів',
      success: false,
    })
  }
}

export const createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body })

    await product.save()

    res.json({ success: true, product })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Невідома помилка при створенні товару',
      success: false,
    })
  }
}

export const removeProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id })

    res.json({ success: true })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Невідома помилка при видаленні товару',
      success: false,
    })
  }
}

export const uploadImage = async (req, res) => {
  try {
    res.json({ success: true, url: `/public/images/${req.file.originalname}` })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Невідома помилка при загрузці зображення',
      success: false,
    })
  }
}
