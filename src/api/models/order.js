import { Schema, model } from 'mongoose'

const Order = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number },
  creationTime: { type: Number },
  updateHour: { type: Number },
  products: [
    {
      _id: { type: Schema.Types.ObjectId },
      name: { type: String },
      quantity: { type: Number },
      remainingQuantity: { type: Number },
    },
  ],
  date: { type: String },
  status: { type: String, default: 'Комплектується' },
  address: { type: String },
})

export default model('Order', Order)
