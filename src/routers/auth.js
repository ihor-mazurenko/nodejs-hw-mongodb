import { Router } from "express";
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";
import {
    loginController,
    logoutController,
    registerController,
    refreshUserSessionController,
} from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";

const authRouter = Router();

authRouter.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerController));

authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginController));

authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default authRouter;