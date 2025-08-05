"use client";
import ActionBar from "@/components/action-bar";
import PostEditor from "@/components/post-editor";
import usePosts from "@/hooks/use-posts";
import { toast } from "@/utils/commons";
import handleErrors from "@/utils/handleErrors";
import { IPost } from "@/utils/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Post = () => {
  const posts = usePosts({});
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    try {
      (async () => {
        const res = await posts.get(params.slug);
        setPost(res.data);
      })();
    } catch (e) {
      toast(handleErrors(e), "error");
    }
  }, [params]);

  return (
    <div className="py-3 px-3 flex flex-col">
      <ActionBar title="Update post" />
      {post && <PostEditor initialValues={post} />}
    </div>
  );
};

export default Post;
