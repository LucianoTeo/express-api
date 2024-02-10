import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors/app-error';
import { AUTH_ERRORS } from '@shared/errors/enums';

import { makeGetUserService } from '@modules/users/factories/make-get-user';

export async function ensureIsAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const getUserUseCase = makeGetUserService() ;
  const user = await getUserUseCase.execute(id);

  if (user.role !== "SUPER") {
    throw new AppError(AUTH_ERRORS['invalid-user-permission']);
  }

  return next();
}
