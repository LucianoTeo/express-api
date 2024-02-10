import { Request, Response } from 'express';
import z from 'zod';

import { makeDeleteUserService } from '../factories/make-delete-user';

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const bodySchema = z.object({
      user_id: z.string()
    })

    const { user_id } = bodySchema.parse(request.params)

    const deleteUserUseCase = makeDeleteUserService() 
    await deleteUserUseCase.execute(user_id);

    return response.status(200).send();
  }
}

export { DeleteUserController };
