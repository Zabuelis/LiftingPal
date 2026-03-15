import axios from 'axios'
import * as SecureStore from 'expo-secure-store';

// Construct HTTP request with specific headers
const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

// Add authentication token to HTTP request if it exists.
api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('liftingPalToken');
    if(token){ 
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
}, (error) => {
    console.log("Axios api error");
});

export default api;