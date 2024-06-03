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

const getOne = async ({ productId }) => {
  return await Fetch({
    url: `/api/products/${productId}`,
    method: 'get',
  })
}

const search = async ({ search }) => {
  return await Fetch({
    url: `/api/products/search?search=${search}`,
    method: 'get',
  })
}

const getDiscounted = async () => {
  return await Fetch({ url: '/api/products/discounted', method: 'get' })
}

const getAllForShoppingCart = async ({ productIds }) => {
  return await Fetch({
    url: `/api/products/shopping-cart/${productIds}`,
    method: 'get',
  })
}

const getAllForFavorites = async ({ productIds }) => {
  return await Fetch({
    url: `/api/products/favorites/${productIds}`,
    method: 'get',
  })
}

const getAllWatched = async ({ productIds }) => {
  return await Fetch({
    url: `/api/products/watched/${productIds}`,
    method: 'get',
  })
}

const getAllByQuery = async ({ searchQuery }) => {
  return await Fetch({
    url: `/api/products/query${searchQuery}`,
    method: 'get',
  })
}

const getAllManufactures = async ({ searchQuery }) => {
  return await Fetch({
    url: `/api/products/query/manufacturers/${searchQuery}`,
    method: 'get',
  })
}

export const ProductService = {
  create,
  update,
  remove,
  getAll,
  getOne,
  search,
  getDiscounted,
  getAllForShoppingCart,
  getAllForFavorites,
  getAllWatched,
  getAllByQuery,
  getAllManufactures,
}
