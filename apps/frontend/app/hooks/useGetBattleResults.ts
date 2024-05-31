import { useState } from "react";
import { GetAttackResultsResponse } from "@/types/requests.types";

export const useGetBattleResults = ({
  id,
  onComplete,
}: {
  id: string;
  onComplete: () => void;
}) => {
  const [respData, setRespData] = useState<GetAttackResultsResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBattleResults = async (opponentId: string) => {
    if (!opponentId) {
      setError("Please select an opponent to battle");
      return;
    }

    setIsLoading(true);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/pokemon/${id}/attack/${opponentId}`;

    const resp = await fetch(url).then((res) => res.json());

    setRespData(resp);
    onComplete();
    setError(null);
    setIsLoading(false);
  };

  return { data: respData, error, getBattleResults, isLoading };
};
