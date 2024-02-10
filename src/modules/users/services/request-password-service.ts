import { AppError } from '@shared/errors/app-error';
import { AUTH_ERRORS } from '@shared/errors/enums';

import { IUsersRepository } from '../repositories/user-repository';

class RequestPasswordService {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(email: string): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError(AUTH_ERRORS['user-not-found'])
    }

    // TODO: send email with a temporary token and the link to actually update it

    return 'Uma nova senha foi solicitada, verifique o seu e-mail!'
  }
}

export { RequestPasswordService };
