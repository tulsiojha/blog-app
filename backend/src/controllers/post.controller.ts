import { Request, Response } from "express";
import postService from "../services/post.service";
import { generatePagination, getPageInfo, handleError } from "../utils/commons";
import { validatePost } from "../utils/validation-schema";

const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ data: null, error: "Id is required" });
      return;
    }
    const [post] = await postService.findOneById({ id });
    if (post.length) {
      res.json({ data: post[0], error: null });
    } else {
      res
        .status(404)
        .json({ data: null, error: `No post found with id ${id}` });
    }
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const [posts] = await postService.findAll(getPageInfo(req));
    const [page] = await postService.getTotalCount();

    res.json({ data: { posts, ...generatePagination(page) }, error: null });
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    validatePost(req.body);
    const [result] = await postService.insertOne(req.body);
    if (result.affectedRows === 1) {
      const { password, ...rest } = req.body;
      res.json({ data: rest, error: null });
      return;
    }
    res.status(400).json({ data: null, error: "Unable to create post" });
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ data: null, error: "Id is required" });
      return;
    }
    validatePost(req.body);
    const [result] = await postService.updateOne(req.body, id);
    if (result.affectedRows === 1) {
      const { password, ...rest } = req.body;
      res.json({ data: rest, error: null });
      return;
    }
    res.status(400).json({ data: null, error: "Unable to update post" });
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const deleteById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ data: null, error: "Id is required" });
      return;
    }
    const [result] = await postService.deleteById({ id });
    if (!result) {
      res.status(400).json({ data: null, error: "Unable to delete post" });
      return;
    }
    res.json({ data: { id }, error: null });
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const postController = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};

export default postController;
