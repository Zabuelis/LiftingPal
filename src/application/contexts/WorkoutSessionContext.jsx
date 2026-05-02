import { createContext, useEffect, useState } from "react";
import api from "../lib/axios";
import { useUser } from "../hooks/useUser";
import handleErrorResponse from "../lib/webErrorMessages";

export const WorkoutSessionContext = createContext();
export function WorkoutSessionProvider({ children }) {
  const [workoutSessions, setWorkoutSessions] = useState();
  const [workoutSession, setWorkoutSession] = useState();
  const { user } = useUser();

  async function fetchWorkoutSessions() {
    try {
      const response = await api.get("/viewWorkoutSession");
      setWorkoutSessions(response.data.workoutSessions);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchWorkoutSession(id) {
    try {
      const response = await api.get("/showWorkoutSession/" + id);
      if (response.data.workoutSession.comments === "null") {
        response.data.workoutSession.comments = "";
      }
      setWorkoutSession(response.data.workoutSession);
    } catch (error) {
      const message = handleErrorResponse(error);
      throw new Error(message);
    }
  }

  async function updateWorkoutSession(id, caption, comments) {
    try {
      const response = await api.put("/updateWorkoutSession/" + id, {
        caption,
        comments,
      });
      await fetchWorkoutSessions();
      return response.data.success;
    } catch (error) {
      console.log(error);
      const message = handleErrorResponse(error);
      throw new Error(message);
    }
  }

  async function deleteWorkoutSession(id) {
    try {
      const response = await api.delete("/deleteWorkoutSession/" + id);
      fetchWorkoutSessions();
      return response.data.success;
    } catch (error) {
      const message = handleErrorResponse(error);
      throw new Error(message);
    }
  }

  async function createWorkoutSession(
    workout_id,
    date,
    duration,
    comments,
    caption,
    sets,
  ) {
    const payload = {
      workout_id,
      date,
      duration,
      comments,
      caption,
      set: sets,
    };
    console.log(payload);
    try {
      const response = await api.post("/createWorkoutSession", payload);
      fetchWorkoutSessions();
      return response.data.success;
    } catch (error) {
      const message = handleErrorResponse(error);
      throw new Error(message);
    }
  }

  useEffect(() => {
    if (user) {
      fetchWorkoutSessions();
    } else {
      setWorkoutSessions([]);
      setWorkoutSession([]);
    }
  }, [user]);

  return (
    <WorkoutSessionContext.Provider
      value={{
        workoutSessions,
        setWorkoutSessions,
        workoutSession,
        fetchWorkoutSessions,
        fetchWorkoutSession,
        deleteWorkoutSession,
        updateWorkoutSession,
        createWorkoutSession,
      }}
    >
      {children}
    </WorkoutSessionContext.Provider>
  );
}
