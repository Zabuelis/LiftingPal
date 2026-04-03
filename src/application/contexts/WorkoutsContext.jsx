import { createContext, useEffect, useState } from "react";
import api from "../lib/axios";
import { useUser } from "../hooks/useUser";
import handleErrorResponse from "../lib/webErrorMessages";

export const WorkoutsContext = createContext();

export function WorkoutsProvider({ children }) {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const { user } = useUser();

  async function fetchWorkouts() {
    try {
      const response = await api.get("/viewWorkout");
      setWorkouts(response.data.workouts);
    } catch (error) {
      const message = handleErrorResponse(error);
      throw new Error(message);
    }
  }

  async function fetchExercises() {
    try {
      const response = await api.get("/viewExercise");
      setExercises(response.data.exercises);
    } catch (error) {
      const message = handleErrorResponse(error);
      throw new Error(message);
    }
  }

  async function createExercise(name, description) {
    try {
      const response = await api.post("/createExercise", {
        name,
        description,
      });
      await fetchExercises();
      return response.data.success;
    } catch (error) {
      const message = handleErrorResponse(error);
      throw new Error(message);
    }
  }

  async function createWorkout(name, exercises) {
    try {
      const response = await api.post("/createWorkout", {
        name,
        description: "",
        exercise_ids: exercises,
      });
      fetchWorkouts();
      return response.data.success;
    } catch (error) {
      const message = handleErrorResponse(error);
      throw new Error(message);
    }
  }

  async function updateExercise(id, name, description) {
    try {
      const response = await api.put("/updateExercise/" + id, {
        name,
        description,
      });
      await fetchExercises();
      return response.data.success;
    } catch (error) {
      const message = handleErrorResponse(error);
      throw new Error(message);
    }
  }

  async function updateWorkout(name, description, id) {}

  async function deleteWorkout(id) {}

  async function deleteExercise(id) {
    try {
      const response = await api.delete("/deleteExercise/" + id);
      const newExercises = exercises.filter(
        (exercise) => exercise.exercise_id !== id,
      );
      setExercises(newExercises);
      return response.data.success;
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
        createExercise,
        updateExercise,
        createWorkout,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
}
