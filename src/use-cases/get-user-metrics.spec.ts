import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get user metrics use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get user metrics', async () => {
    await checkInsRepository.create({
      gym_id: '1',
      user_id: '1',
    })

    const { checkInsCount } = await sut.execute({
      userId: '1',
    })

    expect(checkInsCount).toBe(1)
  })
})
