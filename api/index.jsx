import axios from "axios";

// Set the base URL of the backend API
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
