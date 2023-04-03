export interface ResidentUser {
  id: number,
  email: string,
  name: string,
  Apartament: null | {
    Building: {
      id: number,
      name: string
    },
    id: number,
    name: number
  },
  ParkingLot: null | {
    id: number,
    name: string
  }
}
export interface OwnerUser {
  id: number,
  email: string,
  name: string,
  Building: {
    id: number,
    name: string
  },
}

export interface ApartamentsInfo {
  id: number,
  name: string,
  totalVacancies: number,
  avaliableVacancies: number
  maintenaceRequests: number
}