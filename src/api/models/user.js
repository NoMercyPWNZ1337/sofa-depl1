import { Schema, model } from 'mongoose'

const User = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: 'Role' }],
})

export default model('User', User)
