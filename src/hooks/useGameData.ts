import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { GameData } from "../interface/GameData";

const API_URL = "http://localhost:8080";

const fetchData = async (): Promise<GameData[]> => {
  const response = await axios.get<GameData[]>(
    `${API_URL}/gamevault/games/list`
  );
  return response.data;
};

export function useGameData() {
  const query = useQuery({
    queryKey: ["game-data"],
    queryFn: fetchData,
    retry: 2,
  });
  return {
    ...query,
    data: query.data,
  };
}
