import { Schema, model } from 'mongoose'

const Product = new Schema({
  name: { type: String, required: true },
  availability: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: Buffer, required: true },
})

export default model('Product', Product)
