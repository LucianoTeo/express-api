import { Router } from "express";
import { CreatePermissionController } from "@modules/users/controllers/create-permission-controller";
import { GetPermissionsController } from "@modules/users/controllers/get-permissions-controller";

import { ensureAuthenticated } from "./middlewares/ensureIsAuthenticated";
import { ensureIsAdmin } from "./middlewares/ensureIsASuperUser";

const permissionRoutes = Router();

const createPermission = new CreatePermissionController()
const getPermissions = new GetPermissionsController()

permissionRoutes.use(ensureAuthenticated)
permissionRoutes.get('/', getPermissions.handle);
permissionRoutes.post('/create', ensureIsAdmin, createPermission.handle);

export default permissionRoutes