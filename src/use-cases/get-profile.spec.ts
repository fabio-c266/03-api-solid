import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetProfileUseCase } from './get-profile'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetProfileUseCase

describe('Get profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const userCreated = await usersRepository.create({
      name: 'John Doe',
      email: 'envkt@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      id: userCreated.id,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(async () => {
      await sut.execute({
        id: 'invalid-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
