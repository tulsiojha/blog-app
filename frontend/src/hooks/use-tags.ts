import { queryClient } from "@/utils/query-client";
import { ITagResponse } from "@/utils/types";
import { useEffect, useState } from "react";

const useTags = ({ prefetchTags }: { prefetchTags?: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<ITagResponse | null>(null);

  const refresh = async () => {
    try {
      setLoading(true);
      const query = await queryClient.get("/tag");
      setTags(query.data);
      return query.data;
    } catch (e) {
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prefetchTags) {
      (async () => {
        try {
          await refresh();
        } catch (e) {
          setTags(null);
        }
      })();
    }
  }, [prefetchTags]);

  return { refresh, loading, tags };
};

export default useTags;
