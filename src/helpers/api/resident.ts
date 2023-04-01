import api from "./config";

export async function getResidentUser(userId: number) {
  try{
    const resident = await api.get(`/residents/${userId}`)

    return resident.data; 
  }catch(err) {
    throw err;
  }
} 