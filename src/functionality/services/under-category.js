import { Fetch } from '../utils/fetch.utility.js'

const create = async ({ underCatagoryData }) => {
  return await Fetch({
    url: '/api/under-categories',
    method: 'post',
    body: underCatagoryData,
  })
}

const update = async ({ underCategoryId, underCatagoryData }) => {
  return await Fetch({
    url: `/api/under-categories/${underCategoryId}`,
    method: 'put',
    body: underCatagoryData,
  })
}

const remove = async ({ underCategoryId }) => {
  return await Fetch({
    url: `/api/under-categories/${underCategoryId}`,
    method: 'delete',
  })
}

const getOne = async ({ underCategoryId }) => {
  return await Fetch({
    url: `/api/under-categories/${underCategoryId}`,
    method: 'get',
  })
}

const getAll = async () => {
  return await Fetch({ url: '/api/under-categories', method: 'get' })
}

const getAllWithCategories = async () => {
  return await Fetch({
    url: '/api/under-categories/with-categories',
    method: 'get',
  })
}

export const UnderCategoryService = {
  create,
  update,
  remove,
  getOne,
  getAll,
  getAllWithCategories,
}
