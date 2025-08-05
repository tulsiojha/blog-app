import { Request, Response } from "express";
import postService from "../services/post.service";
import { generatePagination, getPageInfo, handleError } from "../utils/commons";
import { validatePost } from "../utils/validation-schema";
import tagService from "../services/tag.service";

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

const getBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;
    if (!slug) {
      res.status(400).json({ data: null, error: "slug is required" });
      return;
    }
    const [post] = await postService.findOneBySlug({ slug });
    if (post.length) {
      res.json({
        data: { ...post[0], tags: (post[0].tag || "").split(",") },
        error: null,
      });
    } else {
      res
        .status(404)
        .json({ data: null, error: `No post found with id ${slug}` });
    }
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    if (req.query.tags || req.query.search) {
      const [posts] = await postService.findAllByFilter({
        tags: !!req.query.tags ? (req.query.tags as string).split(",") : [],
        search: (req.query.search as string) || "",
        pI: getPageInfo(req),
      });
      const [page] = await postService.getTotalCountFilter({
        tags: !!req.query.tags ? (req.query.tags as string).split(",") : [],
        search: (req.query.search as string) || "",
      });

      res.json({ data: { posts, ...generatePagination(page) }, error: null });
    } else {
      const [posts] = await postService.findAll(getPageInfo(req));
      const [page] = await postService.getTotalCount();

      res.json({ data: { posts, ...generatePagination(page) }, error: null });
    }
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    validatePost(req.body);

    const [result] = await postService.insertOne(req.body);

    await tagService.updatePostTags({
      tags: req.body.tags,
      postId: result.insertId,
    });
    res.json({ data: req.body, error: null });
  } catch (err) {
    console.log(err);
    res.status(400).json({ data: null, error: handleError(err) });
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
    await postService.updateOne(req.body, id);
    await tagService.updatePostTags({ tags: req.body.tags, postId: id });

    res.json({ data: req.body, error: null });
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
    await postService.deleteByIdWithTags(id);
    res.json({ data: { id }, error: null });
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const postController = {
  getAll,
  getById,
  getBySlug,
  create,
  update,
  deleteById,
};

export default postController;
