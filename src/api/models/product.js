import { Schema, model } from 'mongoose'

const Product = new Schema({
  name: { type: String },
  price: { type: Number },
  quantityInWarehouse: { type: Number },
  quantityInDrugstore: { type: Number },
  image: { type: String },
})

export default model('Product', Product)