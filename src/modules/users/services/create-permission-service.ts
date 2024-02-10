import { IPermissionsRepository } from '../repositories/permission-repository';
import { Permissions, Prisma } from '@prisma/client';

class CreatePermissionService {
  constructor(
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({
    name,
  }: Prisma.PermissionsCreateInput): Promise<Permissions | null> {
    const permission = await this.permissionsRepository.create({
      name,
    });
   
    return permission
  }
}

export { CreatePermissionService };
