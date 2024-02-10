import { prisma } from '@shared/lib/prisma'
import { IPermissionsRepository } from '../permission-repository'
import { Prisma } from '@prisma/client'

export class PrismaPermissionsRepository implements IPermissionsRepository {
  async findByIds(ids: string[]) {
    const response = await prisma.permissions.findMany({
      where: {
        id: { in: ids },
      }
    })

    return response
  }

  async create(data: Prisma.PermissionsCreateInput) {
    const response = await prisma.permissions.create({
      data
    })

    return response
  }

  async all() {
    const response = await prisma.permissions.findMany()

    return response
  }
}