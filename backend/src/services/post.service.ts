import db from "../connections/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IPageInfo, IPageResult } from "../utils/commons";

export interface IPost extends RowDataPacket {
  title: string;
  slug: string;
  content: string;
  cover: string;
  tags: string;
  category: number;
  is_draft: boolean;
  created_at?: Date;
  updated_at?: Date;
}

const getTotalCount = () => {
  return db
    .promise()
    .query<IPageResult[]>("SELECT COUNT(*) AS total FROM post;");
};

/* query post by id */
const findOneById = ({ id }: { id: string }) => {
  return db.promise().query<IPost[]>("SELECT * FROM post WHERE id = ?;", [id]);
};

/* query all post */
const findAll = (pI?: IPageInfo) => {
  return db
    .promise()
    .query<
      IPost[]
    >("SELECT * FROM post LIMIT ? OFFSET ?;", [pI?.limit, pI?.offset]);
};

/* create a post */
const insertOne = (props: IPost) => {
  const { title, slug, content, cover, tags, category, is_draft } = props;
  return db
    .promise()
    .query<ResultSetHeader>(
      "INSERT INTO post (title, slug, content, cover, tags, category, is_draft) VALUES (?, ?, ?, ?, ?, ?);",
      [title, slug, content, cover, tags, category, is_draft],
    );
};

/* update a post */
const updateOne = (props: IPost, id: string) => {
  const { title, slug, content, cover, tags, category, is_draft } = props;
  return db
    .promise()
    .query<ResultSetHeader>(
      "UPDATE post SET title = ?, slug = ?, content = ?, cover = ?, tags = ?, category = ?, is_draft = ? WHERE id = ?;",
      [title, slug, content, cover, tags, category, is_draft, id],
    );
};

/* delete a post by id */
const deleteById = ({ id }: { id: string }) => {
  return db
    .promise()
    .query<ResultSetHeader>("DELETE FROM post WHERE id = ?;", [id]);
};

const postService = {
  findOneById,
  findAll,
  insertOne,
  updateOne,
  deleteById,
  getTotalCount,
};

export default postService;
