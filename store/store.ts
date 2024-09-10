import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExerciseData, Workout, WorkoutData } from "../data/data";

export const useStore = create(
  persist(
    (set, get) => ({
      ExerciseList: ExerciseData,
      WorkoutList: WorkoutData,
      FavoritesList: [],
      UserWorkouts: [],
      ExercisesHistoryList: [],
      addUserWorkout: (userWorkout: Workout) =>
        set(
          produce((state) => {
            state.UserWorkouts.push(userWorkout);
          })
        ),
    }),
    {
      name: "gym-ios",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
