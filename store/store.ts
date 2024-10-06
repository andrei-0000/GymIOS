import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Exercise, ExerciseData, Workout, WorkoutData2 } from "../data/data";

export const useStore = create(
  persist(
    (set, get) => ({
      ExerciseList: ExerciseData,
      WorkoutList: WorkoutData2,
      Workouts2: WorkoutData2,
      FavoritesList: [],
      UserWorkouts: WorkoutData2,
      ExercisesHistoryList: [],
      FocusedWorkout: null,
      addUserWorkout: (userWorkout: Workout) =>
        set(
          produce((state) => {
            state.UserWorkouts.push(userWorkout);
          })
        ),
      addExercise: (userExercise: Exercise) =>
        set(
          produce((state) => {
            state.ExerciseList.push(userExercise);
          })
        ),
      setFocusedWorkout: (workout: Workout) =>
        set(
          produce((state) => {
            state.FocusedWorkout = workout;
          })
        ),
      clearWorkoutHistory: () =>
        set(
          produce((state) => {
            state.UserWorkouts = WorkoutData2;
          })
        ),
    }),
    {
      name: "gym-ios",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
