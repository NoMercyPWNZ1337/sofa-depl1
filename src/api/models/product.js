import { Schema, model } from 'mongoose'

const Product = new Schema({
  name: { type: String },
  price: { type: Number },
  discountedPrice: { type: Number, default: '' },
  description: { type: String },
  quantityInWarehouse: { type: Number },
  quantityInDrugstore: { type: Number },
  image: { type: String },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
})

export default model('Product', Product)
