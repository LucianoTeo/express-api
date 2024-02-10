import { IPermissionsRepository } from '../repositories/permission-repository';

import { Permissions } from '@prisma/client';

class GetPermissionsService {
  constructor(
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute(): Promise<Permissions[]> {
    const permissions = await this.permissionsRepository.all();

   return permissions
  }
}

export { GetPermissionsService };
