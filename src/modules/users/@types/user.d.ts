import { Permissions, Prisma } from "@prisma/client"

interface ICreateUserRequest {
  name: string
  email: string
  password: string
  role: Prisma.EnumRoleFieldRefInput
  permission_ids: string[]
}

interface ICreateUserWithPermissions {
  name: string
  email: string
  password: string
  role: Prisma.EnumRoleFieldRefInput
  permissions: Permissions[]
}

interface IUpdateUserRequest extends Omit<ICreateUser, 'password'> {
  id: string
}