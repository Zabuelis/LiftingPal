import { createContext, useEffect, useState } from "react";
import api from "../lib/axios";
import { useUser } from "../hooks/useUser";

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
      setWorkoutSession(response.data.workoutSession);
    } catch (error) {
      console.log(error);
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
        workoutSession,
        fetchWorkoutSessions,
        fetchWorkoutSession,
      }}
    >
      {children}
    </WorkoutSessionContext.Provider>
  );
}
