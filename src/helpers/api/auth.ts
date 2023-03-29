import axios from "axios"

interface residentLoginBody {
  email: string,
  password: string
}

export async function loginAsResident(body: residentLoginBody) {
  try{
    const a = await axios.post(`${import.meta.env.VITE_URL_API}/auth/sign-in`, body);
    console.log(a);
  } catch (err) {
    throw err;
  }
}