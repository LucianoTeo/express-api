import { hash } from 'bcrypt';

import { AppError } from '@shared/errors/app-error';
import { AUTH_ERRORS } from '@shared/errors/enums';

import { IUsersRepository } from '../repositories/user-repository';

interface UpdatePasswordRequest {
  user_id: string
  password: string
  token: string
}

class UpdatePasswordService {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({user_id, password, token }: UpdatePasswordRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if(!user) {
      throw new AppError(AUTH_ERRORS['user-not-found'])
    }

    const hashedPassword = await hash(password, 8);

    await this.usersRepository.update(user.id, {
      password: hashedPassword
    })
  }
}

export { UpdatePasswordService };
