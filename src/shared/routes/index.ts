import { Router } from "express";

import userRoutes from "./users-routes";
import passwordRoutes from "./password-routes";
import permissionRoutes from "./permissions-routes";
import authenticateRoutes from "./authenticate-routes";

const appRoutes = Router();

appRoutes.use('/authenticate', authenticateRoutes);
appRoutes.use('/users', userRoutes);
appRoutes.use('/password', passwordRoutes);
appRoutes.use('/permissions', permissionRoutes);

export default appRoutes;