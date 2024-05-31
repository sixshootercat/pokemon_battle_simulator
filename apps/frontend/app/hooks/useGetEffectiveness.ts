import { useState } from "react";
import { GetWeaknessAndResistanceResponse } from "@/types/requests.types";

export const useGetEffectiveness = ({
  id,
  onComplete,
}: {
  id: string;
  onComplete: () => void;
}) => {
  const [respData, setRespData] =
    useState<GetWeaknessAndResistanceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getEffectiveness = async () => {
    setIsLoading(true);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/pokemon/weakness-resistance/${id}`;

    const resp = await fetch(url).then((res) => res.json());

    setRespData(resp);
    onComplete();
    setError(null);
    setIsLoading(false);
  };

  return { data: respData, error, getEffectiveness, isLoading };
};
