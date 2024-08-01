import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExerciseData from "../data/data";

export const useStore = create(
  persist(
    (set, get) => ({
      ExerciseList: ExerciseData,
      FavoritesList: [],
      UserExerciseList: [],
      ExercisesHistoryList: [],
    }),
    {
      name: "gym-ios",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
