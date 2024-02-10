import { Permissions, Prisma, User } from '@prisma/client'
import { ICreateUserWithPermissions } from '../@types/user'

export interface IUsersRepository {
  create(data: ICreateUserWithPermissions): Promise<User>
  delete(id: string): Promise<void>
  update(id: string, data: Omit<Prisma.UserUpdateInput, 'id'>): Promise<User>
  findById(id: string): Promise<Prisma.UserGetPayload<{ include: { permissions: true }}> | null>
  findByIds(ids: string[]): Promise<Prisma.UserGetPayload<{ include: { permissions: true }}>[]>
  findByEmail(email: string): Promise<User | null>
  all(): Promise<User[]>
}