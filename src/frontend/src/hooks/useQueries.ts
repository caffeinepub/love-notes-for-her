import { useMutation, useQuery } from "@tanstack/react-query";
import type { Note } from "../backend.d";
import { useActor } from "./useActor";

export function useInitializeAndGetDay() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["currentDay"],
    queryFn: async () => {
      if (!actor) return BigInt(1);
      return actor.initializeAndGetDay();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useGetNotes() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<Note>>({
    queryKey: ["notes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotes();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
