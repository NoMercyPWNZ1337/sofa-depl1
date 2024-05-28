import { Schema, model } from 'mongoose'

const UnderCategory = new Schema({
  name: { type: String, unique: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
})

export default model('UnderCategory', UnderCategory)
