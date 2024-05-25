import { Fetch } from '../utils/fetch.utility.js'

const create = async ({ productData }) => {
  return await Fetch({
    url: '/api/products',
    method: 'post',
    body: productData,
  })
}

const update = async ({ productId, productData }) => {
  return await Fetch({
    url: `/api/products/${productId}`,
    method: 'put',
    body: productData,
  })
}

const remove = async ({ productId }) => {
  return await Fetch({
    url: `/api/products/${productId}`,
    method: 'delete',
  })
}

const getAll = async () => {
  return await Fetch({ url: '/api/products', method: 'get' })
}

const getOne = async productId => {
  return await Fetch({
    url: `/api/products/${productId}`,
    method: 'get',
  })
}

export const ProductService = { create, update, remove, getAll, getOne }
