import { Request, Response } from 'express';
import z from 'zod';

import { AUTH_ERRORS } from '@shared/errors/enums';

import { makeRequestPasswordService } from '../factories/make-request-password';

class RequestPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const bodySchema = z.object({
      email: z.string().email({
        message: AUTH_ERRORS['invalid-email']
      })
    })

    const { email } = bodySchema.parse(request.body)

    const requestPasswordUseCase = makeRequestPasswordService() 
    const requestedPasswordMessage = await requestPasswordUseCase.execute(email);

    return response.status(200).send({ message: requestedPasswordMessage });
  }
}

export { RequestPasswordController };
