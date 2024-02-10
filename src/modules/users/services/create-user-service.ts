import { hash } from 'bcrypt';
import { IUsersRepository } from '../repositories/user-repository';
import { ICreateUserRequest } from '../@types/user';
import { IPermissionsRepository } from '../repositories/permission-repository';
import { AppError } from '@shared/errors/app-error';
import { AUTH_ERRORS } from '@shared/errors/enums';
import { User } from '@prisma/client';

class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    role,
    permission_ids,
  }: ICreateUserRequest): Promise<User> {
    const isUserExists = await this.usersRepository.findByEmail(email);

    if (isUserExists) {
      throw new AppError(AUTH_ERRORS['email-already-registered'], 401)
    }

    const hashedPassword = await hash(password, 8);

    const permissions = await this.permissionsRepository.findByIds(permission_ids);
    
    if(permissions !== null && permissions?.length <= 0) {
      throw new AppError(AUTH_ERRORS['invalid-permissions'], 404)
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
      permissions
    })

    return user
  }
}

export { CreateUserService };
