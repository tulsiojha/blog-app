import express from "express";
import postController from "../controllers/post.controller";

const postRouter = express.Router();

/* fetch all post */
postRouter.get("/", postController.getAll);

/* fetch one post */
postRouter.get("/:id", postController.getById);

/* create a post */
postRouter.post("/", postController.create);

/* update a post */
postRouter.post("/:id", postController.update);

/* delete a post */
postRouter.delete("/:id", postController.deleteById);

export default postRouter;
