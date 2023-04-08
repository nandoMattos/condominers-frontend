import api from "./config";

export async function postMaintenance( apartamentId:number | undefined, description: string | undefined) {
  const res = await api.post("/maintenance", {apartamentId, description});
  return res.data;
}

