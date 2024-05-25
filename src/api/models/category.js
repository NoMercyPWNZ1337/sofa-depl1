import { Schema, model } from 'mongoose'

const Category = new Schema({
  name: { type: String, unique: true },
})

export default model('Category', Category)
