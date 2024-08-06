const ExerciseData = [
  {
    name: "dumbell-curl",
    description: "lorem ipsum",
    picture: require("../assets/exercises/dumbell-curl.png"),
    exercise_group: ["biceps", "arms"],
    type: "pull",
    reps: 0,
    sets: 0,
    weight: 0,
  },
  {
    name: "barbell-curl",
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

const WorkoutData = [
  {
    name: "Pull Day 1",
    exercises: [ExerciseData[0], ExerciseData[1]],
  },
  {
    name: "Push Day 1",
    exercises: [ExerciseData[2], ExerciseData[1]],
  },
];

export default ExerciseData;
