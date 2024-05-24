import { validationResult } from 'express-validator'

import Product from '../models/product.js'

export const getOneProduct = async (req, res) => {
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

export const getAllProducts = async (req, res) => {
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

export const createProduct = async (req, res) => {
  try {
    const { errors } = validationResult(req)

    if (errors.length) {
      return res.status(400).json({
        message: 'Помилка при створенні товару',
        errors,
      })
    }

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      quantityInWarehouse: req.body.quantityInWarehouse,
      quantityInDrugstore: req.body.quantityInDrugstore,
      image: req.body.image,
    })

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

export const updateProduct = async (req, res) => {
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
      {
        name: req.body.name,
        price: req.body.price,
        quantityInWarehouse: req.body.quantityInWarehouse,
        quantityInDrugstore: req.body.quantityInDrugstore,
        image: req.body.image,
      }
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

export const removeProduct = async (req, res) => {
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

export const uploadImage = async (req, res) => {
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
