import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ServerConfig } from "../config/index.js";
import { User } from "../models/index.js";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app.error.js";
import { userValidationSchema } from "../validators/user.validations.js";

const validateUserSignUpRequest = (req, res, next) => {
  const validation = userValidationSchema.safeParse(req.body);
  if (!validation.success) {
    ErrorResponse.message = " User sign up validation failed.";
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
    ErrorResponse.error = new AppError(
      validation.error.formErrors.fieldErrors,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

const checkAuth = async (req, res, next) => {
  if (!req.cookies || !req.cookies["x-access-token"]) {
    throw new AppError("No auth token provided.", StatusCodes.UNAUTHORIZED);
  }

  const token = req.cookies["x-access-token"];

  const decoded = jwt.verify(token, ServerConfig.JWT_SECRET);

  if (!decoded) {
    throw new AppError("Invalid token", StatusCodes.UNAUTHORIZED);
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError("User not found.", StatusCodes.UNAUTHORIZED);
  }
  req.user = user;
  next();
};

export default {
  validateUserSignInRequest,
  validateUserSignUpRequest,
  checkAuth,
};
