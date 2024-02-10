import { PrismaUsersRepository } from '../repositories/prisma/user-prisma-repository'
import { RequestPasswordService } from '../services/request-password-service'

export function makeRequestPasswordService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new RequestPasswordService(usersRepository)

  return service
}