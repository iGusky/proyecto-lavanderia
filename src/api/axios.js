import axios from 'axios';

const clienteAxios = axios.create({

  baseURL: 'https://lavanderia-backend.herokuapp.com'
  headers: {
    "Content-type": "application/json"
  }
});

export default clienteAxios;
