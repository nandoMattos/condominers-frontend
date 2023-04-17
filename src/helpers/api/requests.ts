import api from "./config";

export type MaintenanceRequests =  {
  id: number;
  description: string;
  solved: boolean;
  userId: number;
  apartamentId: number;
  createdAt: Date;
  updatedAt: Date;
  Apartament: {
    id: number,
    name: string,
    bedrooms_amount: number,
    bathrooms_amount: number,
    suits_amount: number,
    buildingId: number,
    createdAt: Date,
    updatedAt: Date
  }
}

export type Reports = {
  id: number;
  description: string;
  userId: number;
  solved: boolean;
  createdAt: Date;
  updatedAt: Date;
  User: {
    name: string
  }
}

export type RentSpaces = {
  id: number;
  day_rent: Date;
  userId: number;
  leisureSpaceId: number;
  createdAt: Date;
  updatedAt: Date;
  LeisureSpace: {
    id: number;
    name: string;
    daily_rent: number;
    capacity: number;
    buildingId: number;
    image_url: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

interface RequestsData {
  MaintenanceRequests: MaintenanceRequests[],
  Reports: Reports [],
  RentSpaces: RentSpaces[],
}

export interface ReportsInfo {
  id: number
  type: "maintenance" | "report"
  description: string,
  createdAt: Date
}

export type RequestsParsed = {
  allSolved: ReportsInfo[],
  allUnsolved: ReportsInfo[],
  rents: RentSpaces[]
}

function parseAndAssembleRequests(maintenances: MaintenanceRequests[], reports: Reports[] ){
  const parsedMaintenances:ReportsInfo[] = maintenances.map((m)=>{
    return {
      id:m.id,
      type: "maintenance",
      description: m.description,
      createdAt: m.createdAt
    };
  });
  
  const parsedReports: ReportsInfo[]  = reports.map((m)=>{
    return {
      id:m.id,
      type: "report",
      description: m.description,
      createdAt: m.createdAt
    };
  });
  return [...parsedMaintenances, ...parsedReports];
} 


export async function getUserRequests(userId:number) {
  const res = await  api.get<RequestsData>(`/requests/user/${userId}`);
  const requests = res.data as RequestsData;
  
  const unsolvedMaintenances = requests.MaintenanceRequests.filter((r)=>!r.solved);
  const unsolvedReports = requests.Reports.filter((r)=>!r.solved); 
  const solvedMaintenances = requests.MaintenanceRequests.filter((r)=>r.solved);
  const solvedReports = requests.Reports.filter((r)=>r.solved); 

  const allUnsolved = parseAndAssembleRequests(unsolvedMaintenances, unsolvedReports);
  const allSolved = parseAndAssembleRequests(solvedMaintenances, solvedReports);
  
  return {
    allSolved,
    allUnsolved,
    rents: requests.RentSpaces
  };
}

export async function getAllRequests(){
  const response = await api.get<{Maintenances: MaintenanceRequests[], Reports: Reports[]}>("/requests");
  return response.data;
}

export async function markMaintenanceAsSolved(id:number | undefined ){
  const reponse = await api.patch(`/requests/maintenance/${id}/solve`);
  return reponse.data;
}

export async function markReportAsSolved(id:number | undefined ){
  const reponse = await api.patch(`/requests/report/${id}/solve`);
  return reponse.data;
}