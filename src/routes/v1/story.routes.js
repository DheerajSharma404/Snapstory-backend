import express from "express";
import { StoryController } from "../../controllers/index.js";
import { AuthMiddlewares, StoryMiddlewares } from "../../middlewares/index.js";

const router = express.Router();

/**
 * METHOD: POST
 * REQUEST BODY: {
 * "category":"javascript",
 * "slides":[
 *   {
 *      "heading":"this keyword in JS.",
 *      "description":"this keyword always refer to the calling site",
 *      "image":"http://www.unsplash.com/js-this-123ses234.jpeg"
 *   },
 *   {
 *      "heading":"this keyword in JS.",
 *      "description":"this keyword always refer to the calling site",
 *      "image":"http://www.unsplash.com/js-this-123ses234.jpeg"
 *   },
 *   {
 *      "heading":"this keyword in JS.",
 *      "description":"this keyword always refer to the calling site",
 *      "image":"http://www.unsplash.com/js-this-123ses234.jpeg"
 *   }
 *  ]
 * }
 */
router.post(
  "/",
  StoryMiddlewares.validateCreateStoryRequest,
  AuthMiddlewares.checkAuth,
  StoryController.createStory
);
router.get(
  "/bookmarks",
  AuthMiddlewares.checkAuth,
  StoryController.getBookmarkStories
);

//getAllStoryRequest middleware decides which controller to register next.
/**
 * Get's all the story.
 * METHOD:GET
 * ENDPOINT:"/story"
 */

/**
 * Get's the story by category if category exists.
 * METHOD:GET
 * ENDPOINT:"/story?category=javascript"
 * QUERY PARAMS:category=javascript // value from enum ["javascript", "react", "express", ...]
 */
router.get("/", StoryMiddlewares.getAllStoryRequest);

/**
 * METHOD: GET
 * ENDPOINT: /story/:storyId
 * REQUEST PARAM: storyId
 */
router.get("/:storyId", StoryController.getStoryById);

/**
 * METHOD:PATCH
 * ENDPOINT:/story/:storyId
 * REQUEST PARAM: storyId
 *
 */
router.patch(
  "/:storyId",
  StoryMiddlewares.validateCreateStoryRequest,
  AuthMiddlewares.checkAuth,
  StoryController.editStory
);

/**
 * METHOD:POST
 * ENDPOINT: "/story/like/toggle?modelId=<modleId>&modelType=<modelType>
 * model => id of the resource.
 * modelType=> Type of reource.
 * Example Endpoint: /story/like/toggle?modelId=66213e643baa2282db789092&modelType="Story"
 */
router.post(
  "/like/:storyId",
  AuthMiddlewares.checkAuth,
  StoryController.toggleLike
);

/**
 * METHOD:POST
 * ENDPOINT:/bookmarks
 */

/**
 * METHOD: POST
 * ENDPOINT:/story/bookmark/:storyId
 * REQUEST PARAMS: storyId
 */
router.post(
  "/bookmark/:storyId",
  AuthMiddlewares.checkAuth,
  StoryController.toggleBookmarkedStory
);

export default router;
