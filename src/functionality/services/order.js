import { Fetch } from '../utils/fetch.utility.js'

const create = async ({ orderData }) => {
  return await Fetch({ url: `/api/orders`, method: 'post', body: orderData })
}

const getAll = async () => {
  return await Fetch({ url: `/api/orders`, method: 'get' })
}

export const OrderService = { create, getAll }
