import api from "./config";

export async function joinApartament(jwToken: string | undefined) {
  try{
    await api.post(`/apartaments/invitation/${jwToken}`) 
  }catch(err) {
    throw err;
  }
} 