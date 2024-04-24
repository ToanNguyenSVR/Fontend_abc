import axios from 'axios';
// const baseUrl = 'https://referity.online/api';
const baseUrl = 'http://localhost:8080';
// const baseUrl = 'https://referity.online/api';

const config = {
  baseUrl,
  timeout: 3000000,
};
const myAxios = axios.create(config);
myAxios.defaults.baseURL = baseUrl;
const handleBefore = config => {
  const token = localStorage.getItem('token')?.replaceAll('"', '');
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
};
const handleError = error => {
  console.log(error);
  return;
};
myAxios.interceptors.request.use(handleBefore, null);
// myAxios.interceptors.response.use(null, handleError);

export default myAxios;
