import { PrismaPermissionsRepository } from '../repositories/prisma/permission-prisma-repository'
import { PrismaUsersRepository } from '../repositories/prisma/user-prisma-repository'

import { UpdateUserService } from '../services/update-user-service'

export function makeUpdateUserService() {
  const usersRepository = new PrismaUsersRepository()
  const permissionsRepository = new PrismaPermissionsRepository()
  const service = new UpdateUserService(usersRepository, permissionsRepository )

  return service
}