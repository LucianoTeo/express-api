import { Request, Response } from 'express';
import z from 'zod';

import { makeGetUserService } from '../factories/make-get-user';

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const bodySchema = z.object({
      user_id: z.string()
    })

    const { user_id } = bodySchema.parse(request.params)

    const getUserUseCase = makeGetUserService() 
    const user = await getUserUseCase.execute(user_id);

    return response.status(200).send(user);
  }
}

export { GetUserController };
