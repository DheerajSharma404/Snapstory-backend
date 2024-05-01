import { StatusCodes } from "http-status-codes";
import { StoryRepository, UserRepository } from "../repositories/index.js";
import AppError from "../utils/error/app.error.js";
class StoryService {
  constructor() {
    this.storyRepository = new StoryRepository();
    this.userRepository = new UserRepository();
  }

  async createStory(data) {
    try {
      const story = await this.storyRepository.create(data);
      return story;
    } catch (error) {
      throw new AppError(
        "Something went wrong while creating story.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getStoryById(id) {
    try {
      const story = await this.storyRepository.get(id);
      return story;
    } catch (error) {
      throw new AppError(
        "Something went worng while fetching story by Id.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllStory() {
    try {
      const stories = await this.storyRepository.getAll();
      return stories;
    } catch (error) {
      throw new AppError(
        "Something went wrong while fetching all stories.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getStoryByCategory(category) {
    try {
      const stories = await this.storyRepository.findBy(category);
      return stories;
    } catch (error) {
      throw new AppError(
        "Something went wrong while fetching stories by category.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async editStory(id, data, userId) {
    try {
      const oldStory = await this.storyRepository.get(id);
      if (!(String(oldStory.userId) === String(userId))) {
        throw new AppError(
          "User does not match, unable to update the story.",
          StatusCodes.UNAUTHORIZED
        );
      }
      const newStory = await this.storyRepository.update(id, data);
      return newStory;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Something went wrong while updating story.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async toggleBookmarkedStory(storyId, userId) {
    console.log(storyId, userId);
    try {
      const story = await this.storyRepository.get(storyId);
      console.log(story);
      if (!story) {
        throw new AppError("Invalid story id.", StatusCodes.BAD_REQUEST);
      }
      const user = await this.userRepository.get(userId);
      console.log("user", user);
      if (!user) {
        throw new AppError("Invalid user.", StatusCodes.UNAUTHORIZED);
      }
      if (story.bookmarkUser.includes(userId)) {
        story.bookmarkUser.pull(userId);
        console.log(user);
        await story.save();
      } else {
        story.bookmarkUser.push(userId);
        await story.save();
      }
      return true;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Something went wrong while toggling bookmark story.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserWithBookmarkStories(userId) {
    try {
      const response = await this.storyRepository.getBookmarkStories(userId);
      console.log(response);
      return response;
    } catch (error) {
      throw new AppError(
        "Something went wrong while fetching bookmarked stories.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async toggleStoryLike(storyId, userId) {
    try {
      const story = await this.storyRepository.get(storyId);
      if (!story) {
        throw new AppError("Invalid story id.", StatusCodes.BAD_REQUEST);
      }
      const user = await this.userRepository.get(userId);
      console.log("user", user);
      if (!user) {
        throw new AppError("Invalid user.", StatusCodes.UNAUTHORIZED);
      }
      if (story.likes.includes(userId)) {
        story.likes.pull(userId);
        console.log(user);
        await story.save();
      } else {
        story.likes.push(userId);
        await story.save();
      }
      return true;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Something went wrong while toggling Like.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default StoryService;
