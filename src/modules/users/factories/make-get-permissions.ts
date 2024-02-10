import { PrismaPermissionsRepository } from '../repositories/prisma/permission-prisma-repository'

import { GetPermissionsService } from '../services/get-permissions-service'

export function makeGetPermissionsService() {
  const permissionsRepository = new PrismaPermissionsRepository()
  const service = new GetPermissionsService(permissionsRepository)

  return service
}