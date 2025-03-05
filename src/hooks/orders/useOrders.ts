import { useQuery } from "@tanstack/react-query";
import { getOrderByCustomerId } from "../../actions";

export const useOrders = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrderByCustomerId,
    retry: false,
  });

  return {
    data,
    isLoading,
  };
};
