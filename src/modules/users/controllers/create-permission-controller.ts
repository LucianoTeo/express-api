import { Request, Response } from 'express';
import { z } from 'zod';

import { makeCreatePermissionService } from '../factories/make-create-permission';

class CreatePermissionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const registerBodySchema = z.object({
      name: z.string(),
    })

    const { name } = registerBodySchema.parse(request.body)
    
    const createPermissionUseCase = makeCreatePermissionService() 
    const createdPermission = await createPermissionUseCase.execute({
      name
    });

    return response.json(createdPermission)
  }
}

export { CreatePermissionController };
