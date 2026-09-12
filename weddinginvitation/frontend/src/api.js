import axios from 'axios';

// In dev, requests go through the Vite proxy (see vite.config.js) so this can stay empty.
// In production, set VITE_API_URL to your deployed backend's URL.
const baseURL = import.meta.env.VITE_API_URL || '';

export const api = axios.create({ baseURL });
