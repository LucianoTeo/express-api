import { PrismaUsersRepository } from '../repositories/prisma/user-prisma-repository'
import { AuthenticateUserService } from '../services/authenticate-user-service'

export function makeAuthenticateUserService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new AuthenticateUserService(usersRepository)

  return service
}