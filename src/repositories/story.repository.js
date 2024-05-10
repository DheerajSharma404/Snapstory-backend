import { Story } from "../models/index.js";
import CrudRepository from "./crud.respository.js";

class StoryRepository extends CrudRepository {
  constructor() {
    super(Story);
  }

  async findBy(category) {
    const response = await Story.find({ category: category });
    return response;
  }
  async getBookmarkStories(userId) {
    const response = await Story.find({ bookmarkUser: { $in: [userId] } });
    return response;
  }
  async getUserStory(userId) {
    const response = await Story.find({ userId: userId });

    return response;
  }
}

export default StoryRepository;
