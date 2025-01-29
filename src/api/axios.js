import axios from 'axios';

// Configuración de Axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Tu URL base
  timeout: 10000,
});

export default api;
