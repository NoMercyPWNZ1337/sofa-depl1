import { Schema, model } from 'mongoose'

const Product = new Schema({
  name: { type: String },
  price: { type: Number },
  discountedPrice: { type: Number, default: '' },
  description: { type: String },
  quantityInWarehouse: { type: Number },
  quantityInDrugstore: { type: Number },
  image: { type: String },
  underCategoryId: { type: Schema.Types.ObjectId, ref: 'UnderCategory' },
  analogs: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  manufacturer: { type: String },
  manufacturerCountry: { type: String },
  withRecipe: { type: Boolean },
})

export default model('Product', Product)
