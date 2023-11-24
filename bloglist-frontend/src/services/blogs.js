import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'//'/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const config = {
  headers: { Authorization: token }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async ({ newBlog }) => {
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { setToken, getAll, create }