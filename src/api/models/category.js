import { Schema, model } from 'mongoose'

const Category = new Schema({
  value: { type: String, unique: true },
})

export default model('Category', Category)
