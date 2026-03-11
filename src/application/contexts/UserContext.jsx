import { createContext, useState } from 'react'
import api from '../lib/axios'
import * as SecureStore from 'expo-secure-store';

export const UserContext = createContext()

export function UserProvider({ children }){
    const [user, setUser] = useState()

    async function login(email, password) {
        try {
            const response = await api.post('/login',{
                email, password
            })
            await SecureStore.setItemAsync('liftingPalToken', response.data.token)
            setUser(response.data.user)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function register(name, email, password, password_confirmation) {
        try {
            const response = await api.post('/register', {
                name, email, password, password_confirmation
            })
            await SecureStore.setItemAsync('liftingPalToken', response.data.token)
            setUser(response.data.user)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function logout() {
        try {
            const response = await api.post('/logout')
            await SecureStore.deleteItemAsync('liftingPalToken')
            setUser(null)
        } catch (error) {
            console.log(error.message)
        }
    }

    return(
        <UserContext.Provider value={{ user, login, register, logout }}>
            { children }
        </UserContext.Provider>
    )
}