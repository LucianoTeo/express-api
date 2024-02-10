import { IUsersRepository } from '../repositories/user-repository';
import { AppError } from '@shared/errors/app-error';
import { AUTH_ERRORS } from '@shared/errors/enums';

class DeleteUserService {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if(!user) {
      throw new AppError(AUTH_ERRORS['user-not-found'])
    }

    await this.usersRepository.delete(userId)
  }
}

export { DeleteUserService };
