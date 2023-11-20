import axios from 'axios';

const url = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(url);
  return request.then((res) => res.data);
};

const create = (obj) => {
  const request = axios.post(url, obj);
  return request.then((res) => res.data);
};

const remove = (id, obj) => {
  const request = axios.delete(`${url}/${id}`, obj);
  return request.then((res) => res.data);
};

const update = (id, obj) => {
  const request = axios.put(`${url}/${id}`, obj);
  return request.then((res) => res.data);
};

export default { getAll, create, remove, update };
