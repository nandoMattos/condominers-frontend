import axios from 'axios'; 

const api = axios.create({
  baseURL: process.env.API_URL
})

api.interceptors.request.use((request) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo" ) as string);
    
  if(userInfo.JWToken) {
    request.headers.Authorization = `Bearer ${userInfo.JWToken}`;
  }

  return request; 
}); 

export default api;