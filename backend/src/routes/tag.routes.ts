import express from "express";
import tagController from "../controllers/tag.controller";

const tagRouter = express.Router();

/* fetch all post */
tagRouter.get("/", tagController.getAll);

export default tagRouter;
