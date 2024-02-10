import { Request, Response } from 'express';
import { z } from 'zod';

import { AUTH_ERRORS } from '@shared/errors/enums';
import { makeUpdateUserService } from '../factories/make-update-user';

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const registerBodySchema = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(AUTH_ERRORS['invalid-email']),
      role: z.string().min(1, {
        message: AUTH_ERRORS['required-field']
      }),
      permission_ids: z.array(z.string()).min(1, {
        message: AUTH_ERRORS['permission-missing'],
      }),
    })

    const {
      id,
      name,
      email,
      role,
      permission_ids
    } = registerBodySchema.parse(request.body)
    
    const updateUserUseCase = makeUpdateUserService() 
    const updatedUser = await updateUserUseCase.execute({
      id,
      name,
      email,
      role,
      permission_ids
    });

    return response.json(updatedUser)
  }
}

export { UpdateUserController };
