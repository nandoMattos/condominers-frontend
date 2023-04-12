import api from "./config";

export async function postReport(description: string) {
  const response = await api.post("/reports", {description}); 
  return response.data;
}