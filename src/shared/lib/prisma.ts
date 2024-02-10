import { environment } from '@env/index'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: environment.NODE_ENV === 'dev' ? ['query'] : [],
})