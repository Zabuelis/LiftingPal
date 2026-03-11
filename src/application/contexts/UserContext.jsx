import { createContext, useState } from 'react'

export const UserContext = createContext()

export function UserProvider({ children }){
    const [user, setUser] = useState()

    async function login(email, password) {
        
    }

    async function register(email, name, password) {
        
    }

    async function logout() {
        
    }

    return(
        <UserContext.Provider value={{ user, login, register, logout }}>
            { children }
        </UserContext.Provider>
    )
}