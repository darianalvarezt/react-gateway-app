import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
    baseURL: 'http://localhost:3002',
})

const _create = (params) => {
    return instance.post('/api/gateway/', qs.stringify(params));
};

const _remove = () => {
    return instance.delete('/api/gateway/${id}');
};

const _fetch = () => {
    return instance.get('/api/gateway/');
};

const _fetchById = (id) => {
    return instance.get(`/api/gateway/${id}`);
};

export { _create, _remove, _fetch, _fetchById };