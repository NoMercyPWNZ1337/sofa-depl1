import { Schema, model } from 'mongoose'

const Order = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  summaryAmount: { type: Number },
  products: [
    {
      name: { type: String },
      quantity: { type: Number },
      ref: 'Product',
    },
  ],
  delivered: { type: Boolean, default: false },
  status: { type: String, default: 'Комплектується' },
})

export default model('Order', Order)
