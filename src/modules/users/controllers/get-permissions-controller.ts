import { Request, Response } from 'express';

import { makeGetPermissionsService } from '../factories/make-get-permissions';

class GetPermissionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getPermissionsUseCase = makeGetPermissionsService() 
    const permissions = await getPermissionsUseCase.execute();

    return response.json(permissions)
  }
}

export { GetPermissionsController };
