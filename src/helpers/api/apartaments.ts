import { ApartamentsInfo } from "../../protocols";
import api from "./config";

 interface ApartamentsData {
  id: number,
  name: string,
  bedrooms_amount: number,
  bathrooms_amount: number,
  suits_amount: number,
  buildingId: number,
  _count: {
    User: number,
    MaintenaceRequest: number
  }
}

export async function joinApartament(jwToken: string | undefined) {
  await api.post(`/apartaments/invitation/${jwToken}`);
} 

export async function getAllApartaments(): Promise<ApartamentsInfo[]>{
  const res = await api.get("/apartaments");
  const apsData = res.data as ApartamentsData[];
  const apsInfo: ApartamentsInfo[] = [];
  
  apsData.forEach((apartament)=>{
    apsInfo.push({
      id: apartament.id,
      name: apartament.name,
      totalVacancies: apartament.bedrooms_amount + apartament.suits_amount,
      avaliableVacancies: apartament.bedrooms_amount + apartament.suits_amount - apartament._count.User,
      maintenaceRequests: apartament._count.MaintenaceRequest
    });
  });
  return apsInfo;
}

export async function generateLink(apartamentId: number) {
  const response = await api.get(`/apartaments/${apartamentId}/generate-invite`);
  return response.data;
}