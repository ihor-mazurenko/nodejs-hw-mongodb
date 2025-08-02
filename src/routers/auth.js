import { Router } from "express";
import {
    loginUserSchema,
    registerUserSchema,
    requestResetEmailSchema,
    resetPasswordSchema,
} from "../validation/auth.js";
import {
    loginController,
    logoutController,
    registerController,
    refreshUserSessionController,
    requestResetEmailController,
    resetPasswordController,
} from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";

const authRouter = Router();

authRouter.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerController));

authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginController));

authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

authRouter.post('/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

authRouter.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export default authRouter;