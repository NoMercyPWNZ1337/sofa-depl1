import { validationResult } from 'express-validator'

import Product from '../models/product.js'

const productData = ({ req }) => ({
  name: req.body.name,
  price: req.body.price,
  discountedPrice: req.body.discountedPrice,
  quantityInWarehouse: req.body.quantityInWarehouse,
  quantityInDrugstore: req.body.quantityInDrugstore,
  image: req.body.image,
  categoryId: req.body.categoryId,
  description: req.body.description,
  analogs: req.body.analogs,
  manufacturer: req.body.manufacturer,
  manufacturerCountry: req.body.manufacturerCountry,
  withRecipe: req.body.withRecipe,
})

const getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec()

    return res.json({ success: true, product })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при полученні товару',
      success: false,
    })
  }
}

const getAll = async (req, res) => {
  try {
    const products = await Product.find().exec()

    return res.json({ success: true, products })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при полученні товарів',
      success: false,
    })
  }
}

const create = async (req, res) => {
  try {
    const { errors } = validationResult(req)

    if (errors.length) {
      return res.status(400).json({
        message: 'Помилка при створенні товару',
        errors,
      })
    }

    const product = new Product(productData({ req }))

    await product.save()

    res.json({ success: true, product })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при створенні товару',
      success: false,
    })
  }
}

const update = async (req, res) => {
  try {
    const { errors } = validationResult(req)

    if (errors.length) {
      return res.status(400).json({
        message: 'Помилка при оновленні товару',
        errors,
      })
    }

    await Product.findByIdAndUpdate(
      { _id: req.params.id },
      productData({ req })
    )

    res.json({ success: true })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при оновленні товару',
      success: false,
    })
  }
}

const remove = async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id })

    res.json({ success: true })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при видаленні товару',
      success: false,
    })
  }
}

const search = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $match: {
          $or: [{ name: { $regex: req.query.search, $options: 'i' } }],
        },
      },
    ])

    const analogProductIds = products.map(product => product.analogs).flat()

    const analogProducts = await Product.find()
      .where('_id')
      .in(analogProductIds)
      .exec()

    res.json({ success: true, products, analogProducts })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при пошуку товарів',
      success: false,
    })
  }
}

const uploadImage = async (req, res) => {
  try {
    res.json({ success: true, url: `/public/images/${req.file.originalname}` })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при загрузці зображення',
      success: false,
    })
  }
}

export const ProductController = {
  getOne,
  getAll,
  create,
  update,
  remove,
  uploadImage,
  search,
}
