import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'

import { pages } from './src/index.js'
import api from './src/api/routes/index.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 9999

app.use(express.static(path.resolve()))
app.use(express.json())
app.use(pages)
app.use('/api', ...api)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)

    app.listen(port, () => console.log(`Server started on port: ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
