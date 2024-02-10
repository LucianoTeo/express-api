import { User } from '@prisma/client';

import { IUsersRepository } from '../repositories/user-repository';

class GetAllUsersService {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const allUsers = await this.usersRepository.all();

   return allUsers
  }
}

export { GetAllUsersService };
