import { IUsersRepository } from '../repositories/user-repository';
import { AppError } from '@shared/errors/app-error';
import { AUTH_ERRORS } from '@shared/errors/enums';
import { User } from '@prisma/client';

class GetUserService {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userId: string): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if(!user) {
      throw new AppError(AUTH_ERRORS['user-not-found'])
    }

   return user
  }
}

export { GetUserService };
