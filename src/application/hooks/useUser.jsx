import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export function useUser () {
    const context = useContext(UserContext)
    if(!context){
        throw new Error("useUser exceeds its scope")
    }

    return context
}