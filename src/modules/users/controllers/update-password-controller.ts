import { Request, Response } from 'express';
import { z } from 'zod';

import { AUTH_ERRORS } from '@shared/errors/enums';
import { makeUpdateUserPassword } from '../factories/make-update-user-password';

class UpdatePasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const registerBodySchema = z.object({
      user_id: z.string(),
      token: z.string().min(1, {
        message: AUTH_ERRORS['invalid-token'],
      }),
      password: z.string().min(6, {
        message: AUTH_ERRORS['invalid-password-length'],
      }),
    })

    const { user_id, password, token } = registerBodySchema.parse(request.body)
    
    const updatePasswordUseCase = makeUpdateUserPassword() 
    const createdUser = await updatePasswordUseCase.execute({
      user_id,
      token,
      password
    });

    return response.json(createdUser)
  }
}

export { UpdatePasswordController };
