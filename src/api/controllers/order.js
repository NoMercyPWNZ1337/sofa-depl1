import Order from '../models/order.js'

const getAll = async (req, res) => {
  try {
    const orders = await Order.find().exec()

    return res.json({ success: true, orders })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: 'Помилка при полученні замовлень',
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

const update = async (req, res) => {
  try {
    const { errors } = validationResult(req)

    if (errors.length) {
      return res.status(400).json({
        message: 'Помилка при оновленні замовлення',
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
      message: 'Помилка при оновленні замовлення',
      success: false,
    })
  }
}

export const OrderController = { getAll, create, update }
