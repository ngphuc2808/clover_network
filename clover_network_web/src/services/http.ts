import axios, { AxiosError, AxiosResponse } from 'axios'

const http = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080',
  // timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error.response?.data ? error.response.data : error)
  },
)
export default http
