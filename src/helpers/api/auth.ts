import axios from "axios";

interface ResidentLoginBody {
  email: string,
  password: string
}

interface ResidentSignUpBody {
  name: string
  email: string,
  password: string
}

interface OwnerLoginBody extends ResidentLoginBody{ 
  token: string
}


export async function loginAsResident(body: ResidentLoginBody) {
  const {data} = await axios.post(`${import.meta.env.VITE_URL_API}/auth/sign-in`, body);
  localStorage.setItem("userInfo", JSON.stringify(data));

  return data;
}


export async function loginAsOwner(body: OwnerLoginBody) {
  const {data} = await axios.post(`${import.meta.env.VITE_URL_API}/auth/sign-in/owner`, body);
  localStorage.setItem("userInfo", JSON.stringify(data));

  return data;
}

export async function singUp(body:ResidentSignUpBody) {
  const res = await axios.post(`${import.meta.env.VITE_URL_API}/auth/sign-up`, body);
  return res.data;
}