import express from "express";
import userController from "../controllers/user.controller";

const userRouter = express.Router();

/* fetch one user */
userRouter.get("/:id", userController.getById);

/* fetch all users */
userRouter.get("/", userController.getAll);
/* create a user */
userRouter.post("/", userController.create);

/* delete a user */
userRouter.delete("/:id", userController.deleteById);

export default userRouter;
