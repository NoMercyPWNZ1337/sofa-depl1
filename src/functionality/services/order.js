import { Fetch } from '../utils/fetch.utility.js'

const create = async ({ orderData }) => {
  return await Fetch({ url: `/api/orders`, method: 'post', body: orderData })
}

export const OrderService = { create }
