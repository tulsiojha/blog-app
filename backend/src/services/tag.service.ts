import db from "../connections/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IPageInfo, IPageResult } from "../utils/commons";

export interface ITag extends RowDataPacket {
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

const getTotalCount = () => {
  return db
    .promise()
    .query<IPageResult[]>("SELECT COUNT(*) AS total FROM tag;");
};

/* query tag by id */
const findOneById = ({ id }: { id: string }) => {
  return db.promise().query<ITag[]>("SELECT * FROM tag WHERE id = ?;", [id]);
};

/* query all tag */
const findAll = (pI?: IPageInfo) => {
  return db
    .promise()
    .query<
      ITag[]
    >("SELECT * FROM tag LIMIT ? OFFSET ?;", [pI?.limit, pI?.offset]);
};

/* query using names */
const findAllByNames = (names: string[]) => {
  const placeholders = names.map(() => "?").join(" ,");
  const query = `SELECT id FROM tag WHERE name IN (${placeholders});`;
  return db.promise().query<ITag[]>(query, [...names]);
};

/* create a tag */
const insertOne = (props: ITag) => {
  const { name } = props;
  return db
    .promise()
    .query<ResultSetHeader>(
      "INSERT INTO tag (name) VALUES ? ON DUPLICATE KEY UPDATE id = id;",
      [name],
    );
};

/* create a tag */
const insertPostTags = (
  props: { post_id: number | string; tag_id: number | string }[],
) => {
  console.log(props);
  const values = props.map((post_tag) => [post_tag.post_id, post_tag.tag_id]);
  return db
    .promise()
    .query<ResultSetHeader>(
      "INSERT INTO post_tags (post_id, tag_id) VALUES ? ON DUPLICATE KEY UPDATE post_id = post_id;",
      [values],
    );
};

/* create many tag */
const insertMany = (props: string[]) => {
  const values = props.map((tag) => [tag]);
  return db
    .promise()
    .query<ResultSetHeader>(
      "INSERT INTO tag (name) VALUES ? ON DUPLICATE KEY UPDATE id = id;",
      [values],
    );
};

/* update a tag */
const updateOne = (props: ITag, id: string) => {
  const { name } = props;
  return db
    .promise()
    .query<ResultSetHeader>("UPDATE tag SET name = ? WHERE id = ?;", [
      name,
      id,
    ]);
};

/* delete a tag by id */
const deleteById = ({ id }: { id: string }) => {
  return db
    .promise()
    .query<ResultSetHeader>("DELETE FROM tag WHERE id = ?;", [id]);
};

const updatePostTags = async (props: {
  tags: string[];
  postId: string | number;
}) => {
  const conn = await db.promise().getConnection();
  await conn.beginTransaction();
  try {
    const tags = props.tags.map((tag) => [tag]);
    await conn.query(
      `INSERT INTO tag (name) VALUES ? ON DUPLICATE KEY UPDATE id = id`,
      [tags],
    );

    const [tagRows] = await conn.query<ITag[]>(
      `SELECT id FROM tag WHERE name IN (${props.tags.map(() => "?").join(",")})`,
      props.tags,
    );

    await conn.query(`DELETE FROM post_tags WHERE post_id = ?`, [props.postId]);

    const tagValues = tagRows.map((row) => [props.postId, row.id]);
    if (tagValues.length > 0) {
      await conn.query(`INSERT INTO post_tags (post_id, tag_id) VALUES ?`, [
        tagValues,
      ]);
    }

    await conn.commit();
    console.log("Post tags updated successfully.");
  } catch (err) {
    console.error("Transaction failed:", err);
    await conn.rollback();
  } finally {
  }
};

const tagService = {
  findOneById,
  findAll,
  findAllByNames,
  insertOne,
  insertMany,
  insertPostTags,
  updatePostTags,
  updateOne,
  deleteById,
  getTotalCount,
};

export default tagService;
