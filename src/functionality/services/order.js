import { Fetch } from '../utils/fetch.utility.js'

const create = async ({ orderData }) => {
  return await Fetch({ url: `/api/orders`, method: 'post', body: orderData })
}

const getAllActive = async ({ userId }) => {
  return await Fetch({ url: `/api/orders/active/${userId}`, method: 'get' })
}

const getAllNotActive = async ({ userId }) => {
  return await Fetch({ url: `/api/orders/history/${userId}`, method: 'get' })
}

export const OrderService = { create, getAllActive, getAllNotActive }
