import { createContext, useEffect, useState } from "react";
import api from "../lib/axios";
import { useUser } from "../hooks/useUser";

export const WorkoutsContext = createContext();

export function WorkoutsProvider({ children }) {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const { user } = useUser();

  async function fetchWorkouts() {
    try {
      const response = await api.get("/viewExercise");
      setExercises(response.data.exercises);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchExercises() {
    try {
      const response = await api.get("/viewWorkout");
      setWorkouts(response.data.workouts);
    } catch (error) {
      console.log(error);
    }
  }

  async function createExercise(exercise) {}

  async function createWorkout(workout) {}

  async function updateExercise(exercise) {}

  async function updateWorkout(workout) {}

  async function deleteWorkout(id) {}

  async function deleteExercise(id) {
    try {
      const response = await api.delete("/deleteExercise/" + id);
      const newExercises = exercises.filter(
        (exercise) => exercise.exercise_id !== id,
      );
      setExercises(newExercises);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      fetchExercises();
      fetchWorkouts();
    } else {
      setExercises([]);
      setWorkouts([]);
    }
  }, [user]);

  return (
    <WorkoutsContext.Provider
      value={{
        workouts,
        exercises,
        fetchWorkouts,
        fetchExercises,
        deleteExercise,
        deleteWorkout,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
}
