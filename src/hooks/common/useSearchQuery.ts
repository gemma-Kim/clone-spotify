import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/api/api";

interface SearchQueryParams {
  q: string[] | string;
  type: SearchType[];
  limit?: number;
}

export type SearchType =
  | "track"
  | "artist"
  | "album"
  | "playlist"
  | "show"
  | "episode"
  | "audiobook";

const fetchSearch = ({ q, type, limit = 10 }: SearchQueryParams) => {
  return api().get(`v1/search`, {
    params: {
      q: Array.isArray(q) ? q.join(",") : q,
      type: type.join(","),
      limit,
    },
  });
};

export const useSearchQuery = ({ q, type, limit }: SearchQueryParams) => {
  return useQuery({
    queryKey: ["search", { q, type, limit }],
    queryFn: () => fetchSearch({ q, type, limit }),
    select: (res) => res.data,
    enabled: !!q,
  });
};
