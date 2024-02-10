import { Permissions, Prisma } from '@prisma/client'

export interface IPermissionsRepository {
  create(data: Prisma.PermissionsCreateInput): Promise<Permissions | null>
  findByIds(ids: string[]): Promise<Permissions[]>
  all(): Promise<Permissions[]>
}