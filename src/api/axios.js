import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: 'https://lavanderia-backend.herokuapp.com',
  // baseURL: 'http://localhost:4000',
  headers: {
    "Content-type": "application/json"
  }
});

export default clienteAxios;
