import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExerciseData, WorkoutData } from "../data/data";

export const useStore = create(
  persist(
    (set, get) => ({
      ExerciseList: ExerciseData,
      WorkoutList: WorkoutData,
      FavoritesList: [],
      UserExerciseList: [],
      ExercisesHistoryList: [],
    }),
    {
      name: "gym-ios",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
