import axios from "axios"; 

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API
});

api.interceptors.request.use((request) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo" ) as string);
    
  if(userInfo.jwToken) {
    request.headers.Authorization = `Bearer ${userInfo.jwToken}`;
  }

  return request; 
}); 

export default api;