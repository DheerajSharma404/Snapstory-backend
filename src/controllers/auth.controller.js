import { StatusCodes } from "http-status-codes";
import { UserService } from "../services/index.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";

const userService = new UserService();

const signUp = async (req, res) => {
  try {
    const user = await userService.signUp(req.body);
    SuccessResponse.message = "User successfully signed up.";
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const signIn = async (req, res) => {
  try {
    const token = await userService.signIn(req.body);
    res.cookie("x-access-token", token, { maxAge: 86400000 });
    SuccessResponse.message = "User successfully signed in.";
    SuccessResponse.data = true;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const signOut = async (req, res) => {
  try {
    const user = await userService.getUserByUsername(req.user.username);
    res.clearCookie("x-access-token");
    SuccessResponse.message = "User successfully sign out";
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error?.statusCode).json(ErrorResponse);
  }
};

const validateToken = async (req, res) => {
  try {
    const user = await userService.getUserByUsername(req.user.username);
    SuccessResponse.message = "Fetched user successfully";
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
};

export default {
  signUp,
  signIn,
  signOut,
  validateToken,
};
