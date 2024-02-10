import { User, Prisma, Permissions } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { IUsersRepository } from '../user-repository'
import { ICreateUserWithPermissions } from '@modules/users/@types/user'

export class InMemoryUsersRepository implements IUsersRepository {
  public items: Prisma.UserGetPayload<{ include: { permissions: true }}>[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if(!user) {
      return null
    }

    return user
  }

  async findByIds(ids: string[]) {
    let response: Prisma.UserGetPayload<{ include: { permissions: true }}>[] = []

    this.items.forEach(item => {
      if(ids.includes(item.id)) {
        response.push(item)
      }
    })

    return response
  }

  async delete(id: string) {
    const deleteUser = this.items.filter((item) => item.id !== id)

    this.items = deleteUser;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async all() {
    const users = this.items

    return users
  }

  async create(data: ICreateUserWithPermissions) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      role: data.role || 'ENGINEER',
      password: data.password,
      created_at: new Date(),
      permissions: data.permissions
    }

    this.items.push(user)

    return user
  }

  async update(id: string, data: Partial<Omit<User, 'id'>>) {
    const userIndex = this.items.findIndex((item) => item.id === id)

    const updatedUser = {
      ...this.items[userIndex],
      ...data
    }

    this.items[userIndex] = updatedUser

    return this.items[userIndex]
  }
}