import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: 'https://lavanderia-backend.herokuapp.com'
});

export default clienteAxios;