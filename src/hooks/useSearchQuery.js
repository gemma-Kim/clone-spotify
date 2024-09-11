import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";

const fetchSearch = ({ type, q }) => {
  return api().get(`v1/search?type=${type}&q=${q}`);
};

export const useSearchQuery = ({ q, type }) => {
  return useQuery({
    queryKey: ["search", { q, type }],
    queryFn: () => fetchSearch({ q, type }),
    select: (res) => res.data,
  });
};
