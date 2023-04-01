import api from "./config";

export async function getOwnerInfo(userId: number) {
  const owner = await api.get(`/owners/${userId}`)
  return owner;
} 