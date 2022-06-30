import axios from 'axios';


const clienteAxios = {
    method: 'POST',
    url: process.env.REACT_APP_BACKEND_URL,
    headers: {
      'api-key': process.env.REACT_APP_API_KEY,
      'api-host': process.env.REACT_APP_API_HOST
    }
  };

// const clienteAxios = axios.create({
//     url: process.env.REACT_APP_BACKEND_URL
// });

export default clienteAxios;