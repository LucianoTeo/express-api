import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  EMAIL_PROVIDER: z.string(),
  EMAIL_PROVIDER_HOST: z.string(),
  EMAIL_PROVIDER_PASSWORD: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Missing environment variables', _env.error.format())

  throw new Error('Missing environment variables.')
}

export const environment = _env.data