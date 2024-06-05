import { validationResult } from 'express-validator'
import mongoose from 'mongoose'

import Product from '../models/product.js'
import UnderCategory from '../models/under-category.js'

const productData = ({ req, categoryId }) => ({
  name: req.body.name,
  price: req.body.price,
  discountedPrice: req.body.discountedPrice,
  quantityInDrugstore: req.body.quantityInDrugstore,
  image: req.body.image,
  underCategoryId: req.body.underCategoryId,
  categoryId,
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

    const underCategory = await UnderCategory.findById(
      req.body.underCategoryId
    ).populate('categoryId')

    const product = new Product(
      productData({ req, categoryId: underCategory.categoryId._id })
    )

    await product.save()

    res.json({ success: true })
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

const getDiscountedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      discountedPrice: { $type: 'number' },
    }).limit(10)

    res.json({ success: true, products })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при полученні товарів зі скидкою',
      success: false,
    })
  }
}

const getAllByIds = async (req, res) => {
  try {
    const productIds = JSON.parse(req.params.productIds).map(id => {
      return new mongoose.Types.ObjectId(id)
    })
    const products = await Product.find({ _id: { $in: productIds } })

    res.json({ success: true, products })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при полученні товарів',
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

const getAllByQuery = async (req, res) => {
  try {
    const manufactures = JSON.parse(req.query.manufactures || '[]')
    const underCategoryId = req.query.underCategoryId
    const categoryId = req.query.categoryId
    const withRecipe = req.query.withRecipe
    const withDiscounted = req.query.withDiscounted
    const minPrice = req.query.minPrice || 0
    const maxPrice = req.query.maxPrice

    const findConfig = {}

    if (underCategoryId) findConfig.underCategoryId = underCategoryId
    if (categoryId) findConfig.categoryId = categoryId
    if (withRecipe) findConfig.withRecipe = withRecipe
    if (withDiscounted) findConfig.discountedPrice = { $ne: null }
    if (manufactures.length) findConfig.manufacturer = { $in: manufactures }

    let products = await Product.find(findConfig)

    if (minPrice || maxPrice) {
      products = products.filter(product => {
        const price = product.discountedPrice || product.price

        if (maxPrice && !minPrice) {
          return price <= maxPrice
        }

        if (minPrice && !maxPrice) {
          return price >= minPrice
        }

        return price >= minPrice && price <= maxPrice
      })
    }

    return res.json({ success: true, products })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при полученні товарів',
      success: false,
    })
  }
}

const getAllManufactures = async (req, res) => {
  try {
    const underCategoryId = req.query.underCategoryId
    const categoryId = req.query.categoryId

    const findConfig = {}

    if (underCategoryId) findConfig.underCategoryId = underCategoryId
    if (categoryId) findConfig.categoryId = categoryId

    const manufactures = [
      ...new Set(
        (await Product.find(findConfig)).map(product => {
          return product.manufacturer
        })
      ),
    ]

    return res.json({ success: true, manufactures })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при полученні виробників товару',
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
  getDiscountedProducts,
  getAllByIds,
  getAllByQuery,
  getAllManufactures,
}
