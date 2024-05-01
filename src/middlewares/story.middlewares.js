import { StatusCodes } from "http-status-codes";
import { StoryController } from "../controllers/index.js";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app.error.js";
import { createStoryValidationSchema } from "../validators/story.validations.js";

const validateCreateStoryRequest = (req, res, next) => {
  const validation = createStoryValidationSchema.safeParse(req.body);

  if (!validation.success) {
    ErrorResponse.message = "Story validation failed.";
    ErrorResponse.error = new AppError(
      validation.error.formErrors.fieldErrors,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

const getAllStoryRequest = (req, res, next) => {
  if (req.query.category) {
    return StoryController.getStoryByCategory(req, res, next);
  } else {
    return StoryController.getAllStory(req, res, next);
  }
};

export default {
  validateCreateStoryRequest,
  getAllStoryRequest,
};
