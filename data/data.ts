import { ImageSourcePropType } from "react-native";

export interface Exercise {
  name: string;
  description?: string;
  picture?: ImageSourcePropType;
  exercise_group?: string[];
  type?: string;
  reps: number;
  sets: number;
  weight: number;
}

export interface Workout {
  id: string;
  name: string;
  exercises?: Exercise[];
  date?: Date;
}

export const ExerciseData: Exercise[] = [
  {
    name: "Dumbbell Curl",
    description: "lorem ipsum",
    picture: require("../assets/exercises/dumbell-curl.png"),
    exercise_group: ["biceps", "arms"],
    type: "pull",
    reps: 0,
    sets: 0,
    weight: 0,
  },
  {
    name: "Barbell Curl",
    description: "lorem ipsum",
    picture: require("../assets/exercises/barbell-curl.png"),
    exercise_group: ["biceps", "arms"],
    type: "pull",
    reps: 0,
    sets: 0,
    weight: 0,
  },
  {
    name: "shoulder-dumbell-press",
    description: "lorem ipsum",
    picture: require("../assets/exercises/shoulder-dumbell-press.png"),
    exercise_group: ["shoulders", "arms"],
    type: "push",
    reps: 0,
    sets: 0,
    weight: 0,
  },
];

export const WorkoutData2: Workout[] = [
  {
    id: "W1",
    name: "Pull Day 1",
    exercises: [ExerciseData[0], ExerciseData[1], ExerciseData[2]],
  },
  {
    id: "W2",
    name: "Push Day 1",
    exercises: [ExerciseData[2], ExerciseData[1], ExerciseData[0]],
  },
];
