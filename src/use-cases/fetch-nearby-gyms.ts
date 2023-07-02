import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymsUseCaseRequest {
  latitude: number
  longitude: number
}

export class FetchNearbyGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({ latitude, longitude }: FetchNearbyGymsUseCaseRequest) {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude,
      longitude,
    })

    return {
      gyms,
    }
  }
}
