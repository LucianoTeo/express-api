import { Request, Response } from 'express';
import { z } from 'zod';

import { AUTH_ERRORS } from '@shared/errors/enums';

import { makeAuthenticateUserService } from '../factories/make-authenticate-user';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const registerBodySchema = z.object({
      email: z.string().email(AUTH_ERRORS['invalid-email']),
      password: z.string().min(6, {
        message: AUTH_ERRORS['invalid-password-length'],
      }),
    })

    const {
      email,
      password,
    } = registerBodySchema.parse(request.body)
    
    const authenticateUseCase = makeAuthenticateUserService() 
    const { user, token } = await authenticateUseCase.execute({
      email,
      password,
    });

    return response.json({
      user,
      token
    })
  }
}

export { AuthenticateUserController };
