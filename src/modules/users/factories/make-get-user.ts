import { PrismaUsersRepository } from '../repositories/prisma/user-prisma-repository'
import { GetUserService } from '../services/get-user-service'

export function makeGetUserService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new GetUserService(usersRepository)

  return service
}