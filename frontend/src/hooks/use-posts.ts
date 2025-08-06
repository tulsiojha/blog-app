import { queryClient } from "@/utils/query-client";
import { IPostResponse } from "@/utils/types";
import { useEffect, useState } from "react";

const usePosts = ({ queryParams }: { queryParams?: Record<string, any> }) => {
  const [posts, setPosts] = useState<IPostResponse | null>(null);

  const refresh = async () => {
    const query = await queryClient.get(
      `/post?limit=${queryParams?.limit || ""}&page=${queryParams?.page || ""}&tags=${queryParams?.tags || ""}&search=${queryParams?.search || ""}`,
    );
    setPosts(query.data);
    return query.data;
  };

  const get = async (slug: string) => {
    const query = await queryClient.get(`/post/${slug}`);
    return query.data;
  };

  const create = async (data: Record<string, any>) => {
    return queryClient.post("/post", data);
  };
  const update = async (id: string | number, data: Record<string, any>) => {
    return queryClient.post(`/post/${id}`, data);
  };
  const remove = async (id: string | number) => {
    return queryClient.delete(`/post/${id}`);
  };

  useEffect(() => {
    if (queryParams) {
      (async () => {
        try {
          await refresh();
        } catch (e) {
          setPosts(null);
        }
      })();
    }
    console.log("here");
  }, [
    queryParams?.limit,
    queryParams?.page,
    queryParams?.search,
    queryParams?.tags,
  ]);

  return { posts, refresh, create, update, get, remove };
};

export default usePosts;
