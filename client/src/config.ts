// Read backend URL from Vite env var (set VITE_BACKEND_URL in deploy), fallback to localhost
export const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL as string) || "http://localhost:5000";