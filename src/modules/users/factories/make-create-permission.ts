import { PrismaPermissionsRepository } from '../repositories/prisma/permission-prisma-repository'
import { CreatePermissionService } from '../services/create-permission-service'

export function makeCreatePermissionService() {
  const permissionsRepository = new PrismaPermissionsRepository()
  const service = new CreatePermissionService(permissionsRepository )

  return service
}