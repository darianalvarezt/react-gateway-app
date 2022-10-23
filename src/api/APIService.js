import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3002',
})

const create = (params) => instance.post('/api/gateway/', params)

const remove = (ids) => instance.delete('/api/gateway/', { data: { ids } })

const fetch = () => instance.get('/api/gateway/')

const fetchById = (id) => instance.get(`/api/gateway/${id}`)

export { create, remove, fetch, fetchById }
