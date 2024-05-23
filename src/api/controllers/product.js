import Product from '../models/product.js'

export const createProduct = (req, res) => {
  try {
    res.json({ success: true, body: req.body })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Невідома помилка',
      success: false,
    })
  }
}
