import { Prisma, User } from '@prisma/client'
import { prisma } from '@shared/lib/prisma'
import { IUsersRepository } from '../user-repository'
import { ICreateUserWithPermissions } from '@modules/users/@types/user'

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: ICreateUserWithPermissions) {
    const response = await prisma.user.create({
      data: {
        ...data,
        permissions: {
          create: data.permissions
        }
      }
    })

    return response
  }
  
  async findById(id: string) {
    const response = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        permissions: true
      }
    })

    return response
  }

  async findByIds(ids: string[]) {
    const response = await prisma.user.findMany({
      where: {
        id: { in: ids},
      },
      include: {
        permissions: true
      }
    })

    return response
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }

  async update(id: string, data: Partial<Omit<User, 'id'>>) {
    const response = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
      include: {
        permissions: true
      }
    })

    return response
  }

  async findByEmail(email: string) {
    const response = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        permissions: true
      }
    })

    return response
  }

  async all() {
    const response = await prisma.user.findMany()

    return response
  }
}