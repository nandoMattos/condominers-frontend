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