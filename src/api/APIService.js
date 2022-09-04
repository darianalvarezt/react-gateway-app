import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3002',
})

const _create = (params) => {
    return instance.post('/api/gateway/', params);
};

const _remove = (ids) => {
    return instance.delete('/api/gateway/', {data: { ids}});
};

const _fetch = () => {
    return instance.get('/api/gateway/');
};

const _fetchById = (id) => {
    return instance.get(`/api/gateway/${id}`);
};

export { _create, _remove, _fetch, _fetchById };