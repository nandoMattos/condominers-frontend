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
  try{
    await api.post(`/apartaments/invitation/${jwToken}`) 
  }catch(err) {
    throw err;
  }
} 

export async function getAllApartaments(): Promise<ApartamentsInfo[]>{
  try{
    const res = await api.get("/apartaments")
    const apsData = res.data as ApartamentsData[]
    let apsInfo: ApartamentsInfo[] = []

    apsData.forEach((apartament)=>{
      apsInfo.push({
        id: apartament.id,
        name: apartament.name,
        totalVacancies: apartament.bedrooms_amount + apartament.suits_amount,
        avaliableVacancies: apartament.bedrooms_amount + apartament.suits_amount - apartament._count.User,
        maintenaceRequests: apartament._count.MaintenaceRequest
      })
    })
    console.log(apsInfo)
    return apsInfo;
  }catch(err) {
    throw err;
  }
}

export async function generateLink(apartamentId: number) {
  try{ 
    const response = await api.get(`/apartaments/${apartamentId}/generate-invite`)
    return response.data;
  } catch(err ) {
    throw err;
  }
}