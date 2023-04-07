import axios from "axios";

interface residentLoginBody {
  email: string,
  password: string
}

interface ownerLoginBody extends residentLoginBody{ 
  token: string
}


export async function loginAsResident(body: residentLoginBody) {
  const {data} = await axios.post(`${import.meta.env.VITE_URL_API}/auth/sign-in`, body);
  localStorage.setItem("userInfo", JSON.stringify(data));

  return data;
}


export async function loginAsOwner(body: ownerLoginBody) {
  const {data} = await axios.post(`${import.meta.env.VITE_URL_API}/auth/sign-in/owner`, body);
  localStorage.setItem("userInfo", JSON.stringify(data));

  return data;
}