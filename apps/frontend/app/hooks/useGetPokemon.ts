import { useState, useEffect, useCallback } from "react";
import { GetAllPokemonResponse } from "@/types/requests.types";
import { getPokemon } from "../services";

/**
 * Custom hook to get pokemon data. Data can be fetched by query, url, limit, or offset.
 */
export const useGetPokemon = (initialParams: {
  query?: string;
  url?: string;
  limit?: string;
  offset?: string;
}) => {
  const [data, setData] = useState<GetAllPokemonResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getPokemon(params);
      setData(response);
      setError(null);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = (newParams: {
    query?: string;
    url?: string;
    limit?: string;
    offset?: string;
  }) => {
    setParams(newParams);
  };

  return { data, isLoading, error, refetch };
};
