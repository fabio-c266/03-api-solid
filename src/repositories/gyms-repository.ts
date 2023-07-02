import { Gym, Prisma } from '@prisma/client'

export interface findManyNearParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearBy(params: findManyNearParams): Promise<Gym[]>
  create(dat: Prisma.GymCreateInput): Promise<Gym>
}
