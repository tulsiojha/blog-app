import { Request, Response } from "express";
import userService from "../services/user.service";
import { generatePagination, getPageInfo, handleError } from "../utils/commons";
import authController from "./auth.controller";

const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ data: null, error: "Id is required" });
      return;
    }
    const [user] = await userService.findOneById({ id });
    if (user.length) {
      const { password, ...rest } = user[0];
      res.json({ data: rest, error: null });
    } else {
      res
        .status(404)
        .json({ data: null, error: `No user found with id ${id}` });
    }
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const [users] = await userService.findAll(getPageInfo(req));
    const [page] = await userService.getTotalCount();

    res.json({
      data: { users, ...generatePagination(page) },
      error: null,
    });
    return;
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const create = async (req: Request, res: Response) => {
  authController.register(req, res);
};

const deleteById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ data: null, error: "Id is required" });
      return;
    }
    const [result] = await userService.deleteById({ id });
    if (!result) {
      res.status(404).json({ data: null, error: "Unable to delete user" });
      return;
    }
    res.json({ data: { id }, error: null });
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const userController = {
  getById,
  getAll,
  create,
  deleteById,
};

export default userController;
