import Product from '../models/product.js'

export const createProduct = async (req, res) => {
  try {
    res.json({ success: true, body: req.body })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Невідома помилка при створенні товару',
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
