import mongoose from 'mongoose'
import Order from '../models/order.js'

const getAllActive = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
      delivered: false,
    }).exec()

    return res.json({ success: true, orders })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при полученні активних замовлень',
      success: false,
    })
  }
}

const getAllNotActive = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.params.userId),
          $or: [
            { status: { $regex: 'Доставлено', $options: 'i' } },
            { status: { $regex: 'Скасовано', $options: 'i' } },
          ],
        },
      },
    ])

    return res.json({ success: true, orders })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при полученні не активних замовлень',
      success: false,
    })
  }
}

const create = async (req, res) => {
  try {
    const order = new Order({
      userId: req.body.userId,
      amount: req.body.amount,
      products: req.body.products,
    })

    await order.save()

    res.json({ success: true })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при створенні замовлення',
      success: false,
    })
  }
}

export const OrderController = { getAllActive, getAllNotActive, create }
