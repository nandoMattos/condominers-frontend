import api from "./config";

export async function getResidentUser(userId: number) {
  const resident = await api.get(`/residents/${userId}`) 
} 