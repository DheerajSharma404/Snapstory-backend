import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ServerConfig } from "../config/index.js";
import { UserRepository } from "../repositories/index.js";
import AppError from "../utils/error/app.error.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async getUserByUsername(username) {
    try {
      const user = await this.userRepository.findBy({ username: username });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async signUp(data) {
    try {
      const isExistingUser = await this.userRepository.findBy({
        username: data.username,
      });
      if (isExistingUser) {
        throw new AppError("Username already exists.", StatusCodes.CONFLICT);
      }
      const newUser = await this.userRepository.create(data);
      return newUser;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Something went wrong while sign up.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async signIn(data) {
    try {
      const user = await this.getUserByUsername(data.username);
      if (!user) {
        throw new AppError("User does not exist.", StatusCodes.UNAUTHORIZED);
      }
      if (!user.comparePassword(data.password)) {
        throw new AppError("Invalid Credential", StatusCodes.UNAUTHORIZED);
      }
      const token = user.generateJWT();
      return { userId: user._id, username: user.username, token };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Something went wrong while sign in.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async isAuthenticated(token) {
    try {
      if (!token) {
        throw new AppError("Missing JWT token", StatusCodes.BAD_REQUEST);
      }
      const response = jwt.verify(token, ServerConfig.JWT_SECRET);

      const user = await this.userRepository.get(response.id);
      if (!user) {
        throw new AppError("No user found", StatusCodes.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      if (error instanceof AppError) throw error;
      if (error.name === "JsonWebTokenError") {
        throw new AppError("Invaid JWT Token", StatusCodes.BAD_REQUEST);
      }
      if (error.name === "TokenExpiredError") {
        throw new AppError("JWT token expired", StatusCodes.BAD_REQUEST);
      }
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
export default UserService;
