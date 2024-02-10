import { PrismaUsersRepository } from '../repositories/prisma/user-prisma-repository'
import { GetAllUsersService } from '../services/get-users-service'

export function makeGetAllUsersService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new GetAllUsersService(usersRepository)

  return service
}