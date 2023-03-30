import axios from "axios"
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

interface residentLoginBody {
  email: string,
  password: string
}

interface ownerLoginBody extends residentLoginBody{ 
  token: string
}


export async function loginAsResident(body: residentLoginBody) {
  try{
    const {data} = await axios.post(`${import.meta.env.VITE_URL_API}/auth/sign-in`, body);
    localStorage.setItem("userInfo", JSON.stringify(data));

    return data
  } catch (err) {
    throw err;
  }
}

export async function loginAsOwner(body: ownerLoginBody) {
  try {
    const {data} = await axios.post(`${import.meta.env.VITE_URL_API}/auth/sign-in/owner`, body)
    localStorage.setItem("userInfo", JSON.stringify(data))
    return data;

  }catch(err) {
    throw err;
  }
}