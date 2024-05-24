import { Schema, model } from 'mongoose'

const Product = new Schema({
  name: { type: String, required: true },
  availability: { type: String, required: true },
  price: { type: Number, required: true },
  quantityInWarehouse: { type: Number, required: true },
  quantityInDrugstore: { type: Number, required: true },
  image: { type: String, required: true },
})

export default model('Product', Product)
