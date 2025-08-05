"use client";

import ActionBar from "@/components/action-bar";
import PostEditor from "@/components/post-editor";

const CreatePost = () => {
  return (
    <div className="py-3 px-3 flex flex-col">
      <ActionBar title="Create Post" />
      <PostEditor />
    </div>
  );
};

export default CreatePost;
