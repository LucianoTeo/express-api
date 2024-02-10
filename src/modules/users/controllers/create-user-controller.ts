import { Request, Response } from 'express';
import { z } from 'zod';

import { makeCreateUserService } from '../factories/make-create-user';
import { AUTH_ERRORS } from '@shared/errors/enums';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(AUTH_ERRORS['invalid-email']),
      password: z.string().min(6, {
        message: AUTH_ERRORS['invalid-password-length'],
      }),
      role: z.string().min(1, {
        message: AUTH_ERRORS['required-field']
      }),
      permission_ids: z.array(z.string()).min(1, {
        message: AUTH_ERRORS['permission-missing'],
      }),
    })

    const {
      name,
      email,
      password,
      role,
      permission_ids
    } = registerBodySchema.parse(request.body)
    
    const createUserUseCase = makeCreateUserService() 
    const createdUser = await createUserUseCase.execute({
      name,
      email,
      password,
      role,
      permission_ids
    });

    return response.json(createdUser)
  }
}

export { CreateUserController };
