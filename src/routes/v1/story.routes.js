import express from "express";
import { StoryController } from "../../controllers/index.js";
import { AuthMiddlewares, StoryMiddlewares } from "../../middlewares/index.js";

const router = express.Router();

/** Create a story.
 * METHOD: POST
 * REQUEST HEADER: token
 * REQUEST BODY: {
 * "category":"Food",
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
 * ENDPOINT: /story
 * 
 * RESPONSE:{
    "error": false,
    "data": {
        "userId": "6638e01f3b37ebed0670be21",
        "category": "Food",
        "slides": [
            {
                "heading": "this keyword in JS.",
                "description": "this keyword always refer to the calling site",
                "imageUrl": "http://www.unsplash.com/js-this-123ses234.jpeg",
                "_id": "663a34500f8cd390ae01b100"
            },
            {
                "heading": "this keyword in JS.",
                "description": "this keyword always refer to the calling site",
                "imageUrl": "http://www.unsplash.com/js-this-123ses234.jpeg",
                "_id": "663a34500f8cd390ae01b101"
            },
            {
                "heading": "this keyword in JS.",
                "description": "this keyword always refer to the calling site",
                "imageUrl": "http://www.unsplash.com/js-this-123ses234.jpeg",
                "_id": "663a34500f8cd390ae01b102"
            }
        ],
        "likes": [],
        "bookmarkUser": [],
        "_id": "663a34500f8cd390ae01b0ff",
        "createdAt": "2024-05-07T14:01:52.101Z",
        "updatedAt": "2024-05-07T14:01:52.101Z",
        "__v": 0
    },
    "message": "Successfully created Story.",
    "success": true
}
 */
router.post(
  "/",
  StoryMiddlewares.validateCreateStoryRequest,
  AuthMiddlewares.checkAuth,
  StoryController.createStory
);

/** Get user's bookmark stories.
 * METHOD: GET
 * REQUEST HEADER: token
 * ENDPOINT: /story/bookmarks
 * RESPONSE: {
    "error": false,
    "data": [
        {
            "_id": "663b3f3bb9f6742b4ecd1824",
            "userId": "663b3d3eb7f69b26c457425b",
            "category": "Food",
            "slides": [
                {
                    "heading": "this keyword in JS.",
                    "description": "this keyword always refer to the calling site",
                    "imageUrl": "http://www.unsplash.com/js-this-123ses234.jpeg",
                    "_id": "663b3f3bb9f6742b4ecd1825"
                },
                {
                    "heading": "this keyword in JS.",
                    "description": "this keyword always refer to the calling site",
                    "imageUrl": "http://www.unsplash.com/js-this-123ses234.jpeg",
                    "_id": "663b3f3bb9f6742b4ecd1826"
                },
                {
                    "heading": "this keyword in JS.",
                    "description": "this keyword always refer to the calling site",
                    "imageUrl": "http://www.unsplash.com/js-this-123ses234.jpeg",
                    "_id": "663b3f3bb9f6742b4ecd1827"
                }
            ],
            "likes": [],
            "bookmarkUser": [
                "663b3d3eb7f69b26c457425b"
            ],
            "createdAt": "2024-05-08T09:00:43.709Z",
            "updatedAt": "2024-05-08T09:16:24.631Z",
            "__v": 1
        }
    ],
    "message": "Successfully fetched  bookmarked stories",
    "success": true
}
 */
router.get(
  "/bookmarks",
  AuthMiddlewares.checkAuth,
  StoryController.getBookmarkStories
);

//getAllStoryRequest middleware decides which controller to registe next.

/** Get's all the story.
 * METHOD:GET
 * ENDPOINT:/story
 * RESPONSE: All the story in the platform.
 */

/**
 * METHOD: GET
 * REQUEST HEADER: token
 * ENDPOINT: /user-stories
 */

router.get(
  "/user-stories",
  AuthMiddlewares.checkAuth,
  StoryController.getUserStories
);
/** Get's the story by category if category exists.
 * METHOD: GET
 * QUERY PARAMS: category=Food // value from enum ["Food", "Travel", "Education", ...]
 * ENDPOINT: /story?category=Food
 * RESPONSE;{
    "error": false,
    "data": [
        {
            "_id": "663b3f3bb9f6742b4ecd1824",
            "userId": "663b3d3eb7f69b26c457425b",
            "category": "Food",
            "slides": [
                {
                    "heading": "this keyword in JS.",
                    "description": "this keyword always refer to the calling site",
                    "imageUrl": "http://www.unsplash.com/js-this-123ses234.jpeg",
                    "_id": "663b3f3bb9f6742b4ecd1825"
                },
                {
                    "heading": "this keyword in JS.",
                    "description": "this keyword always refer to the calling site",
                    "imageUrl": "http://www.unsplash.com/js-this-123ses234.jpeg",
                    "_id": "663b3f3bb9f6742b4ecd1826"
                },
                {
                    "heading": "this keyword in JS.",
                    "description": "this keyword always refer to the calling site",
                    "imageUrl": "http://www.unsplash.com/js-this-123ses234.jpeg",
                    "_id": "663b3f3bb9f6742b4ecd1827"
                }
            ],
            "likes": [],
            "bookmarkUser": [],
            "createdAt": "2024-05-08T09:00:43.709Z",
            "updatedAt": "2024-05-08T09:00:43.709Z",
            "__v": 0
        }
        ......
    ],
    "message": "Successfully fetched all Stories by category.",
    "success": true
}
 */
router.get("/", StoryMiddlewares.getAllStoryRequest);

/** Get a single story by Id.
 * METHOD: GET
 * REQUEST PARAM: storyId
 * ENDPOINT: /story/:storyId
 * RESPONSE: Single story that matches the storyId.
 */
router.get("/:storyId", StoryController.getStoryById);

/** Edit a Story.
 * METHOD:PATCH
 * REQUEST HEADER: token
 * REQUEST PARAM: storyId
 * ENDPOINT:/story/:storyId
 * RESPONSE: Story object with the modification.
 */
router.patch(
  "/:storyId",
  StoryMiddlewares.validateCreateStoryRequest,
  AuthMiddlewares.checkAuth,
  StoryController.editStory
);

/** Like a story.
 * METHOD:POST
 * REQUEST HEADER: token
 * ENDPOINT: "/story/like/:storyId
 * Example Endpoint: /story/like/6638e5de2d6c3476fc5abde9
 * RESPONSE: {
 *    "error": false,
 *    "data": true,
 *    "message": "Successfully toggled like ",
 *   "success": true
 *   }
 */

router.post(
  "/like/:storyId",
  AuthMiddlewares.checkAuth,
  StoryController.toggleLike
);

/** Bookmark a story.
 * METHOD: POST
 * REQUEST HEADER: {token}
 * REQUEST PARAMS: storyId
 * ENDPOINT:/story/bookmark/:storyId
 * Example Endpoint: /story/bookmark/6638e5de2d6c3476fc5abde9
 * RESPONSE: {
 *    "error": false,
 *    "data": true,
 *    "message": "Successfully toggled bookmark.",
 *   "success": true
 *   }
 */
router.post(
  "/bookmark/:storyId",
  AuthMiddlewares.checkAuth,
  StoryController.toggleBookmarkedStory
);

export default router;
