import express from "express";
import authController from "../../controllers/auth.controller.js";
import { AuthController } from "../../controllers/index.js";
import { AuthMiddlewares } from "../../middlewares/index.js";

const router = express.Router();

/**
 * METHOD: POST
 * REQUEST BODY: { username:"@johndoe",password:"johnDoe@123"}
 */
router.post(
  "/sign-up",
  AuthMiddlewares.validateUserSignUpRequest,
  AuthController.signUp
);

/**
 * METHOD: POST
 * REQUEST BODY: { username:"@johnd",password:"johnDoe@123"}
 */
router.post(
  "/sign-in",
  AuthMiddlewares.validateUserSignInRequest,

  AuthController.signIn
);

/**
 * METHOD:POST
 */
router.post("/sign-out", AuthMiddlewares.checkAuth, AuthController.signOut);

/**
 * METHOD:POST
 * REQUEST BODY: {token}
 */
router.post(
  "/validate-token",
  AuthMiddlewares.checkAuth,
  authController.validateToken
);
export default router;
