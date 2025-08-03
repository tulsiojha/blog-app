import db from "../connections/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IPageInfo, IPageResult } from "../utils/commons";

export interface IUser extends RowDataPacket {
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

const getTotalCount = () => {
  return db
    .promise()
    .query<IPageResult[]>("SELECT COUNT(*) AS total FROM user;");
};

/* query user by id */
const findOneById = ({ id }: { id: string }) => {
  return db.promise().query<IUser[]>("SELECT * FROM user WHERE id = ?;", [id]);
};

/* query all user */
const findAll = (pI?: IPageInfo) => {
  return db
    .promise()
    .query<
      IUser[]
    >("SELECT id, email, created_at, updated_at FROM user LIMIT ? OFFSET ?;", [pI?.limit, pI?.offset]);
};

/* query user by email */
const findOneByEmail = ({ email }: { email: string }) => {
  return db
    .promise()
    .query<IUser[]>("SELECT * FROM user WHERE email = ?;", [email]);
};

/* create a user */
const insertOne = (props: IUser) => {
  const { email, password } = props;
  return db
    .promise()
    .query<ResultSetHeader>(
      "INSERT INTO user (email, password) VALUES (?, ?);",
      [email, password],
    );
};

/* delete a user by id */
const deleteById = ({ id }: { id: string }) => {
  return db
    .promise()
    .query<ResultSetHeader>("DELETE FROM user WHERE id = ?;", [id]);
};

const userService = {
  findOneById,
  findOneByEmail,
  findAll,
  insertOne,
  deleteById,
  getTotalCount,
};

export default userService;
