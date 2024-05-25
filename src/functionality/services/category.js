import { Fetch } from '../utils/fetch.utility.js'

const create = async ({ catagoryData }) => {
  return await Fetch({
    url: '/api/categories',
    method: 'post',
    body: catagoryData,
  })
}

const update = async ({ categoryId, categoryData }) => {
  return await Fetch({
    url: `/api/categories/${categoryId}`,
    method: 'put',
    body: categoryData,
  })
}

const remove = async ({ categoryId }) => {
  return await Fetch({
    url: `/api/categories/${categoryId}`,
    method: 'delete',
  })
}

const getOne = async ({ categoryId }) => {
  return await Fetch({
    url: `/api/categories/${categoryId}`,
    method: 'get',
  })
}

const getAll = async () => {
  return await Fetch({ url: '/api/categories', method: 'get' })
}

export const CategoryService = { create, update, remove, getOne, getAll }
