export interface IPageResult {
  total: number;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export type IUserResponse = {
  data: { users: IUser[]; pageInfo: IPageResult };
};

export interface IPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  is_draft: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type IPostResponse = {
  data: { posts: IPost[]; pageInfo: IPageResult };
};

export interface ITag {
  id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export type ITagResponse = {
  data: { tags: ITag[]; pageInfo: IPageResult };
};
