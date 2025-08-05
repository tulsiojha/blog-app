"use client";
import DeleteModal from "@/components/delete-modal";
import List from "@/components/list";
import { formatDate, getParams, toast } from "@/utils/commons";
import { IPost } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import ActionBar from "@/components/action-bar";
import { PAGINATION_LIMIT } from "@/utils/constants";
import usePosts from "@/hooks/use-posts";
import ItemAction from "@/components/item-action";
import SearchInput from "@/components/search";
import useDebounce from "@/hooks/use-debounce";
import PostFilter from "@/components/post-filters";
import useTags from "@/hooks/use-tags";

const Posts = () => {
  const router = useRouter();
  const sp = useSearchParams();
  const [page, limit, tags, search] = [
    sp.get("page"),
    sp.get("limit"),
    sp.get("tags"),
    sp.get("search"),
  ];

  const [searchText, setSearchText] = useState(search || "");

  useDebounce(
    async () => {
      router.push(getParams("search", searchText, sp));
    },
    [searchText],
    300,
  );

  const { tags: tagsList } = useTags({ prefetchTags: true });
  const posts = usePosts({
    queryParams: { page, limit, tags, search },
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IPost | undefined>();

  return (
    <div className="p-2 flex flex-col">
      <ActionBar
        title="Posts"
        action={
          <div className="flex flex-row items-center gap-4">
            <div className="w-[300px]">
              <SearchInput
                placeholder="Search post"
                value={searchText}
                onChange={({ target }) => {
                  setSearchText(target.value);
                }}
              />
            </div>
            <PostFilter
              tags={tagsList}
              value={useMemo(() => (!!tags ? tags?.split(",") : []), [tags])}
              onChange={(f) => {
                router.push(getParams("tags", f.join(","), sp));
              }}
            />
          </div>
        }
      />
      <List
        totalItems={posts?.posts?.data?.pageInfo.total || 0}
        page={Number(page || 1)}
        onPageChanged={(p) => {
          router.push(getParams("page", p, sp));
        }}
        perPage={Number(limit) || PAGINATION_LIMIT}
        onLimitChanged={(e) => {
          router.push(getParams("limit", e, sp));
        }}
        columns={[
          {
            id: "name",
            label: "Name",
            className: "w-[150px] md:w-[200px] flex-1",
          },
          {
            id: "draft",
            label: "Draft",
            className: "w-[100px] md:w-[180px] flex-1",
          },
          {
            id: "created_at",
            label: "Created At",
            className: "w-[100px] md:w-[180px]",
          },
          { id: "actions", label: "Actions" },
        ]}
        rows={
          posts.posts?.data.posts.map((post) => ({
            columns: {
              name: { render: () => post.title },
              draft: { render: () => (post.is_draft ? "Draft" : null) },
              created_at: { render: () => formatDate(post.created_at) },
              actions: {
                render: () => (
                  <ItemAction
                    deleteProps={{
                      onClick: (e) => {
                        e.stopPropagation();
                        setSelectedPost(post);
                        setDeleteModalOpen(true);
                      },
                    }}
                    editProps={{
                      onClick: (e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/posts/${post.slug}`);
                      },
                    }}
                  />
                ),
              },
            },
            id: post.id,
          })) || []
        }
      />
      <DeleteModal
        open={deleteModalOpen}
        openChange={() => {
          setSelectedPost(undefined);
          setDeleteModalOpen(false);
        }}
        resource="post"
        onSubmit={async () => {
          if (selectedPost) {
            const query = await posts.remove(selectedPost.id);
            setDeleteModalOpen(false);
            toast("Post deleted successfully", "success");
            router.refresh();
            await posts.refresh();
            return query;
          }
        }}
      />
    </div>
  );
};

export default Posts;
