import { IUsersRepository } from '../repositories/user-repository';
import { IPermissionsRepository } from '../repositories/permission-repository';
import { AppError } from '@shared/errors/app-error';
import { AUTH_ERRORS } from '@shared/errors/enums';
import { User } from '@prisma/client';
import { IUpdateUserRequest } from '../@types/user';

class UpdateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    role,
    permission_ids,
  }: IUpdateUserRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError(AUTH_ERRORS['email-already-registered'], 401)
    }

    let updatedPermissions = user.permissions;

    if(permission_ids.length) {
      const permissionsExists = await this.permissionsRepository.findByIds(permission_ids);

      if(permissionsExists && permissionsExists?.length <= 0) {
        throw new AppError(AUTH_ERRORS['invalid-permissions'], 404)
      }

      updatedPermissions = updatedPermissions
    }
    
    const updatedUser = await this.usersRepository.update(id, {
      name,
      email,
      role,
      permissions: {
        create: updatedPermissions || []
      }
    })

    return updatedUser
  }
}

export { UpdateUserService };
