import { StatusCodes } from "http-status-codes";
import { UserService } from "../services/index.js";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app.error.js";
import { userValidationSchema } from "../validators/user.validations.js";

const userService = new UserService();

const validateUserSignUpRequest = (req, res, next) => {
  const validation = userValidationSchema.safeParse(req.body);
  if (!validation.success) {
    ErrorResponse.message = "User sign up validation failed.";
    ErrorResponse.error = new AppError(
      validation.error.formErrors.fieldErrors,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
};

const validateUserSignInRequest = (req, res, next) => {
  const validation = userValidationSchema.safeParse(req.body);
  if (!validation.success) {
    ErrorResponse.message = "User sign in validation failed.";
    ErrorResponse.error = new AppError(
      validation.error.formErrors.fieldErrors,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

const checkAuth = async (req, res, next) => {
  try {
    const user = await userService.isAuthenticated(
      req.headers["x-access-token"]
    );
    req.user = user;
    next();
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

export default {
  validateUserSignInRequest,
  validateUserSignUpRequest,
  checkAuth,
};
