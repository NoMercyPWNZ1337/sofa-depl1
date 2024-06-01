import { Schema, model } from 'mongoose'

const Order = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number },
  creationTime: { type: Number },
  updateHour: { type: Number },
  products: [
    {
      name: { type: String },
      quantity: { type: Number },
      remainingQuantity: { type: Number },
    },
  ],
  delivered: { type: Boolean, default: false },
  status: { type: String, default: 'Комплектується' },
})

export default model('Order', Order)
