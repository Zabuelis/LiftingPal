import { WorkoutSessionContext } from "../contexts/WorkoutSessionContext";
import { useContext } from "react";

export function useWorkoutSessions() {
  const context = useContext(WorkoutSessionContext);
  if (!context) {
    throw new Error("useWorkoutSessions exceeds its scope");
  }
  return context;
}
