import { StatusCodes } from "http-status-codes";
import { StoryService } from "../services/index.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";
const storyService = new StoryService();

const createStory = async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user._id;
    const story = await storyService.createStory(data);
    SuccessResponse.message = "Successfully created Story.";
    SuccessResponse.data = story;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getStoryById = async (req, res) => {
  try {
    const story = await storyService.getStoryById(req.params.storyId);
    SuccessResponse.message = "Successfully fetched the story.";
    SuccessResponse.data = story;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getAllStory = async (req, res) => {
  try {
    const stories = await storyService.getAllStory();
    SuccessResponse.message = "Successfully fetched all the stories";
    SuccessResponse.data = stories;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getStoryByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const stories = await storyService.getStoryByCategory(category);
    SuccessResponse.message = "Successfully fetched all Stories by category.";
    SuccessResponse.data = stories;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const editStory = async (req, res) => {
  try {
    const story = await storyService.editStory(
      req.params.storyId,
      req.body,
      req.user._id
    );
    SuccessResponse.message = "Successfully updated the story.";
    SuccessResponse.data = story;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const toggleBookmarkedStory = async (req, res) => {
  try {
    const user = await storyService.toggleBookmarkedStory(
      req.params.storyId,
      req.user._id
    );
    SuccessResponse.message = "Successfully bookmarked the story.";
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

export const getBookmarkStories = async (req, res) => {
  console.log(req.user);
  try {
    const bookmarkStories = await storyService.getUserWithBookmarkStories(
      req.user._id
    );
    SuccessResponse.message = "Successfully fetched  bookmarked stories";
    SuccessResponse.data = bookmarkStories;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const toggleLike = async (req, res) => {
  try {
    const isLikeAdded = await storyService.toggleStoryLike(
      req.params.storyId,
      req.user._id
    );
    SuccessResponse.message = "Successfully toggled like ";
    SuccessResponse.data = isLikeAdded;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error?.statusCode).json(ErrorResponse);
  }
};

export default {
  createStory,
  getAllStory,
  getStoryByCategory,
  getStoryById,
  editStory,
  toggleBookmarkedStory,
  getBookmarkStories,
  toggleLike,
};
