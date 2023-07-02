import { it, describe, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Jonh Doe',
      email: 'envkt@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const userPassword = '123456'

    const { user } = await sut.execute({
      name: 'Jonh Doe',
      email: 'envkt@example.com',
      password: userPassword,
    })

    const isPasswordCorrectlyHashed = await compare(
      userPassword,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'envkt@example.com'
    const userPassword = '123456'

    await sut.execute({
      name: 'Jonh Doe',
      email,
      password: userPassword,
    })

    await expect(async () => {
      await sut.execute({
        name: 'Jonh Doe',
        email,
        password: userPassword,
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
