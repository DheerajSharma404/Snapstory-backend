import { StatusCodes } from "http-status-codes";
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
      console.log(error);
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
      return token;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Something went wrong while sign in.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
export default UserService;
