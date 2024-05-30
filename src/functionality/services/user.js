import { Fetch } from '../utils/fetch.utility.js'

const update = async ({ userId, userData }) => {
  return await Fetch({
    url: `/api/user/${userId}`,
    method: 'put',
    body: userData,
  })
}

export const UserService = { update }
