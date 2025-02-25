import { useQueries } from "@tanstack/react-query";
import { getRandomProducts, getRecentProducts } from "../../actions";

export const useHomeProducts = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["recentProducts"],
        queryFn: getRecentProducts,
      },
      {
        queryKey: ["popularProducts"],
        queryFn: getRandomProducts,
      },
    ],
  });

  const [recentProductsResults, popularProductsResults] = results;
  const isLoading =
    recentProductsResults.isLoading || popularProductsResults.isLoading;
  const isError =
    recentProductsResults.isError || popularProductsResults.isError;

  return {
    recentProducts: recentProductsResults.data || [],
    popularProducts: popularProductsResults.data || [],
    isLoading,
    isError,
  };
};
