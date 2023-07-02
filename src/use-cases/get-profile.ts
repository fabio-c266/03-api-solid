import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetProfileUseCaseRequest {
  id: string
}

export class GetProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ id }: GetProfileUseCaseRequest) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
