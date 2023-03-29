import axios from 'axios'; 

const api = axios.create({
    baseURL: process.env.API_URL
})

api.interceptors.request.use((request) => {
  const token = JSON.parse(localStorage.getItem(("token" )) || "{}");
    
  if(token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request; 
}); 

export default api;