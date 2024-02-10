import { PrismaUsersRepository } from '../repositories/prisma/user-prisma-repository'
import { UpdatePasswordService } from '../services/update-password-service'

export function makeUpdateUserPassword() {
  const usersRepository = new PrismaUsersRepository()
  const service = new UpdatePasswordService(usersRepository)

  return service
}