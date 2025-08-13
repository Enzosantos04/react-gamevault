import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { GameData } from "../interface/GameData";
import type { AxiosPromise } from "axios";

const API_URL = "http://localhost:8080";

const postData = async (data: GameData): AxiosPromise<unknown> => {
  const response = axios.post(API_URL + "/gamevault/games", data);
  return response;
};

export function useGameDataMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game-data"] });
    },
  });
  return mutate;
}
