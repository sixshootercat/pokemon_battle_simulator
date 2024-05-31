import { GetAllPokemonResponse } from "@/types/requests.types";

export const getPokemon = async ({
  query,
  url,
  limit = "5",
  offset = "0",
}: {
  query?: string;
  url?: string;
  limit?: string;
  offset?: string;
}): Promise<GetAllPokemonResponse> => {
  if (url) {
    console.log({ url });
    const resp = await fetch(url);
    const data = await resp.json();

    return data;
  }

  const params = new URLSearchParams();
  if (query) params.append("name", query);
  if (limit) params.append("limit", limit);
  if (offset) params.append("offset", offset);

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pokemon${params.toString() ? `?${params.toString()}` : ""}`
  );

  const data = await resp.json();

  return data;
};
