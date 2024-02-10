import { PrismaPermissionsRepository } from '../repositories/prisma/permission-prisma-repository'
import { PrismaUsersRepository } from '../repositories/prisma/user-prisma-repository'
import { CreateUserService } from '../services/create-user-service'

export function makeCreateUserService() {
  const usersRepository = new PrismaUsersRepository()
  const permissionsRepository = new PrismaPermissionsRepository()
  const service = new CreateUserService(usersRepository, permissionsRepository )

  return service
}