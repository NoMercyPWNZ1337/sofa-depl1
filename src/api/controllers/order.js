import mongoose from 'mongoose'

import Order from '../models/order.js'
import Product from '../models/product.js'

const changeStatus = ({ status }) => {
  if (Math.random() < 0.3) return 'Скасовано'
  if (status === 'Комплектується') return 'Відправлено'
  if (status === 'Відправлено') return 'Доставлено'

  return status
}

const changeStatusOrder = async ({ userId }) => {
  try {
    const orders = await Order.find({ userId }).exec()

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i]

      if (order.status === 'Скасовано' || order.status === 'Доставлено') {
        continue
      }

      // const updateDate = order.creationTime + order.updateHour * 3.6e6
      const updateDate = order.creationTime + order.updateHour 
      const currentDate = new Date().getTime()

      if (currentDate >= updateDate) {
        const status = changeStatus({ status: order.status })
        const orderUpdate = await Order.findByIdAndUpdate(
          { _id: order._id },
          { status, updateHour: order.updateHour * 2 }
        )

        if (status === 'Доставлено') {
          for (let p = 0; p < orderUpdate.products.length; p++) {
            const product = orderUpdate.products[p]

            await Product.findByIdAndUpdate(
              { _id: product._id },
              { quantityInDrugstore: product.remainingQuantity }
            )
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
    console.log('Помилка при оновленні статусу замовлення')
  }
}

const getAllActive = async (req, res) => {
  await changeStatusOrder({ userId: req.params.userId })

  try {
    const orders = await Order.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.params.userId),
          $or: [
            { status: { $regex: 'Комплектується', $options: 'i' } },
            { status: { $regex: 'Відправлено', $options: 'i' } },
          ],
        },
      },
    ])

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
      date: req.body.date,
      address: req.body.address,
      creationTime: new Date().getTime(),
      // updateHour: Math.floor(Math.random() * (6 - 1 + 1) + 1),
      updateHour: 10000,
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
