import { AuthenticateUserController } from "@modules/users/controllers/authenticate-user-controller";
import { Router } from "express";

const authenticateRoutes = Router();
const authenticateUser = new AuthenticateUserController()

authenticateRoutes.post('/', authenticateUser.handle);

export default authenticateRoutes