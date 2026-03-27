import { WorkoutsContext } from "../contexts/WorkoutsContext";
import { useContext } from "react";

export function useWorkouts () {
    const context = useContext(WorkoutsContext)
    if(!context){
        throw new Error("useWorkouts exceeds its scope")
    }

    return context
}