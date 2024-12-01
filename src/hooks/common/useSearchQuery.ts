import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/api/api";

interface SearchQueryParams {
  q: string;
  type: string;
  limit?: number;
}

const fetchSearch = ({ q, type, limit = 10 }: SearchQueryParams) => {
  return api().get(`v1/search`, {
    params: {
      q,
      type,
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
