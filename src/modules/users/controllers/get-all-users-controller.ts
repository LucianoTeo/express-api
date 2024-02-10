import { Request, Response } from 'express';
import { makeGetAllUsersService } from '../factories/make-get-all-users';

class GetAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllUsersUseCase = makeGetAllUsersService() 
    await getAllUsersUseCase.execute();

    return response.status(200).send();
  }
}

export { GetAllUsersController };
