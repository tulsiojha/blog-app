import { Request, Response } from "express";
import tagService from "../services/tag.service";
import { generatePagination, getPageInfo, handleError } from "../utils/commons";
import { validateTag } from "../utils/validation-schema";

const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ data: null, error: "Id is required" });
      return;
    }
    const [tag] = await tagService.findOneById({ id });
    if (tag.length) {
      res.json({ data: tag[0], error: null });
    } else {
      res.status(404).json({ data: null, error: `No tag found with id ${id}` });
    }
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const [tags] = await tagService.findAll(getPageInfo(req));
    const [page] = await tagService.getTotalCount();

    res.json({ data: { tags, ...generatePagination(page) }, error: null });
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    validateTag(req.body);
    const [result] = await tagService.insertOne(req.body);
    if (result.affectedRows === 1) {
      const { password, ...rest } = req.body;
      res.json({ data: rest, error: null });
      return;
    }
    res.status(400).json({ data: null, error: "Unable to create tag" });
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
    validateTag(req.body);
    const [result] = await tagService.updateOne(req.body, id);
    if (result.affectedRows === 1) {
      const { password, ...rest } = req.body;
      res.json({ data: rest, error: null });
      return;
    }
    res.status(400).json({ data: null, error: "Unable to update tag" });
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
    const [result] = await tagService.deleteById({ id });
    if (!result) {
      res.status(400).json({ data: null, error: "Unable to delete tag" });
      return;
    }
    res.json({ data: { id }, error: null });
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const tagController = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};

export default tagController;
