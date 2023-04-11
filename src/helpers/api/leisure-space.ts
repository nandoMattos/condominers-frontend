import dayjs from "dayjs";
import api from "./config";

export async function getLeisureSpaces(){
  const res = await api.get("/leisure-spaces");
  return res.data as LeisureSpaceFormat[];
}

export async function getSpaceSchedule(spaceId: number){
  const res = await api.get(`/leisure-spaces/${spaceId}/schedule`);
  const schedule = res.data as DaySchedule[];
  const rentedDays = schedule.map((s)=> dayjs(s.day_rent).toDate()); 
  return rentedDays;
}

export async function rentSpace(spaceId: number, day_rent: any) {
  const res = await api.post(`/leisure-spaces/${spaceId}/rent`, {day_rent});
  return res.data;
}

export interface LeisureSpaceFormat {
  buildingId: number;
  capacity: number;
  daily_rent: number;
  id: number;
  image_url: string;
  name:string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DaySchedule {
  id: number;
  day_rent: Date;
  userId: number;
  leisureSpaceId: number;
  createdAt: Date;
  updatedAt: Date;
}