import { Router } from "express";

import { CreateUserController } from "@modules/users/controllers/create-user-controller";
import { GetAllUsersController } from "@modules/users/controllers/get-all-users-controller";
import { GetUserController } from "@modules/users/controllers/get-user-controller";
import { DeleteUserController } from "@modules/users/controllers/delete-user-controller";
import { UpdateUserController } from "@modules/users/controllers/update-user-controller";
import { ensureIsAdmin } from "./middlewares/ensureIsASuperUser";
import { ensureAuthenticated } from "./middlewares/ensureIsAuthenticated";

const userRoutes = Router();

const createUser = new CreateUserController()
const getAllUsers = new GetAllUsersController()
const getUser = new GetUserController()
const deleteUser = new DeleteUserController()
const updateUser = new UpdateUserController()

// COMMON AUTHENTICATED ROUTES
userRoutes.use(ensureAuthenticated)
userRoutes.get('/:user_id', getUser.handle);
userRoutes.delete('/:user_id', deleteUser.handle);
userRoutes.put('/:user_id', updateUser.handle);

// SUPER ROUTES
userRoutes.use(ensureIsAdmin)
userRoutes.post('/create', createUser.handle);
userRoutes.get('/', getAllUsers.handle);

export default userRoutes