import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', 
});

// api.defaults.withCredentials = true;

export const auth = (
  username: string,
  password: string,
) => api.post('/users/signin', {
  username,
  password,
},
);

export const getConnections = (userId: number, token: string) => api.get(`/users/${userId}`, {
  headers: {
    'authorization': token,
  }
} );

export const checkToken = (token: string) => api.post(
  '/users/auth',
  {},
  {
    headers: {
      'authorization': token,
    }
  });

export const getQueryData = (
  connectionId: number,
  queryId: number,
  token: string,
  initialDate: string,
  finalDate: string,
) => api.post(
  'customer/get_data',
  {
    connectionId,
    queryId,
    initialDate,
    finalDate,
  },
  {
    headers: {
      'authorization': token
    }
  }
);



export default api;

