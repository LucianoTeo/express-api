import { Router } from "express";

import { UpdatePasswordController } from "@modules/users/controllers/update-password-controller";
import { RequestPasswordController } from "@modules/users/controllers/request-password-controller";

const passwordRoutes = Router();

const updatePassword = new UpdatePasswordController()
const requestPassword = new RequestPasswordController()

passwordRoutes.post('/forgot', requestPassword.handle);
passwordRoutes.post('/update', updatePassword.handle);

export default passwordRoutes