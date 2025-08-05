import db from "../connections/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IPageInfo, IPageResult } from "../utils/commons";

export interface IPost extends RowDataPacket {
  title: string;
  slug: string;
  content: string;
  is_draft: boolean;
  created_at?: Date;
  updated_at?: Date;
}

const getTotalCount = () => {
  return db
    .promise()
    .query<IPageResult[]>("SELECT COUNT(*) AS total FROM post;");
};

const getTotalCountFilter = ({
  tags,
  search,
}: {
  tags: string[];
  search: string;
}) => {
  const tagQuery =
    tags.length > 0
      ? `AND tag.name IN (${tags.map(() => "?").join(", ")})`
      : "";
  const query = `SELECT COUNT(DISTINCT post.id) AS total FROM post JOIN post_tags ON post.id = post_tags.post_id JOIN tag ON post_tags.tag_id = tag.id WHERE (post.title LIKE CONCAT('%', ?, '%')) ${tagQuery};`;

  let values = [search];
  if (tags.length > 0) {
    values.push(...tags);
  }

  return db.promise().query<IPageResult[]>(query, values);
};

/* query post by id */
const findOneById = ({ id }: { id: string }) => {
  return db.promise().query<IPost[]>("SELECT * FROM post WHERE id = ?;", [id]);
};

/* query post by slug */
const findOneBySlug = ({ slug }: { slug: string }) => {
  return db
    .promise()
    .query<
      IPost[]
    >("SELECT post.id, post.title, post.slug, post.is_draft, post.content, post.created_at, post.updated_at, GROUP_CONCAT(tag.name) AS tag FROM post JOIN post_tags ON post_tags.post_id = post.id JOIN tag ON post_tags.tag_id = tag.id WHERE post.slug = ? GROUP BY post.id, post.title, post.slug, post.is_draft, post.content, post.created_at, post.updated_at;", [slug]);
};

/* query all post */
const findAll = (pI?: IPageInfo) => {
  return db
    .promise()
    .query<
      IPost[]
    >("SELECT * FROM post LIMIT ? OFFSET ?;", [pI?.limit, pI?.offset]);
};

const findAllByFilter = ({
  pI,
  tags,
  search,
}: {
  pI?: IPageInfo;
  tags: string[];
  search: string;
}) => {
  const tagQuery =
    tags.length > 0
      ? `AND tag.name IN (${tags.map(() => "?").join(", ")})`
      : "";
  const query = `SELECT DISTINCT post.* FROM post JOIN post_tags ON post.id = post_tags.post_id JOIN tag ON post_tags.tag_id = tag.id WHERE (post.title LIKE CONCAT('%', ?, '%')) ${tagQuery} LIMIT ? OFFSET ?;`;

  let values = [search];
  if (tags.length > 0) {
    values.push(...tags);
  }
  values.push(pI?.limit, pI?.offset);

  return db.promise().query<IPost[]>(query, values);
};

/* create a post */
const insertOne = (props: IPost) => {
  const { title, slug, content, is_draft } = props;
  return db
    .promise()
    .query<ResultSetHeader>(
      "INSERT INTO post (title, slug, content, is_draft) VALUES (?, ?, ?, ?);",
      [title, slug, content, is_draft],
    );
};

/* update a post */
const updateOne = (props: IPost, id: string) => {
  const { title, slug, content, is_draft } = props;
  return db
    .promise()
    .query<ResultSetHeader>(
      "UPDATE post SET title = ?, slug = ?, content = ?, is_draft = ? WHERE id = ?;",
      [title, slug, content, is_draft, id],
    );
};

/* delete a post by id */
const deleteById = ({ id }: { id: string }) => {
  return db
    .promise()
    .query<ResultSetHeader>("DELETE FROM post WHERE id = ?;", [id]);
};

const deleteByIdWithTags = async (id: string | number) => {
  const conn = await db.promise().getConnection();
  await conn.beginTransaction();
  try {
    await conn.query(`DELETE FROM post_tags WHERE post_id = ?;`, [id]);
    await conn.query(`DELETE FROM post WHERE id = ?;`, [id]);

    await conn.commit();
    console.log("Post deleted successfully.");
  } catch (err) {
    console.error("Transaction failed:", err);
    await conn.rollback();
  } finally {
  }
};

const postService = {
  findOneById,
  findOneBySlug,
  findAll,
  findAllByFilter,
  insertOne,
  updateOne,
  deleteById,
  deleteByIdWithTags,
  getTotalCount,
  getTotalCountFilter,
};

export default postService;
