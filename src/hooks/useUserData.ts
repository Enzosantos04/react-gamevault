import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { UserData } from "../interface/UserData";
import type { AxiosPromise } from "axios";

const API_URL = "http://localhost:8080";
const postUser = async (data: UserData): AxiosPromise<unknown> => {
  const response = axios.post(API_URL + "/gamevault/auth/register", data);
  return response;
};

export function useUserDataMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
    },
  });

  return mutate;
}
