import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymUseCaseRequest {
  query: string
  page: number
}

export class SearchGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({ query, page }: SearchGymUseCaseRequest) {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
