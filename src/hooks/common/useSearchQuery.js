import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/api/api";

const fetchSearch = ({ q, type, limit = 10 }) => {
  return api().get(`v1/search`, {
    params: {
      q,
      type,
      limit,
    },
  });
};

export const useSearchQuery = ({ q, type, limit }) => {
  return useQuery({
    queryKey: ["search", { q, type, limit }],
    queryFn: () => fetchSearch({ q, type, limit }),
    select: (res) => res.data,
    enabled: !!q,
  });
};
