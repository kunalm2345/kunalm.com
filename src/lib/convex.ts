import { ConvexHttpClient } from "convex/browser";

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;

if (!CONVEX_URL) {
    throw new Error("VITE_CONVEX_URL environment variable is not set");
}

export const convex = new ConvexHttpClient(CONVEX_URL);

// Add logging to debug connection issues
console.log("Convex client initialized with URL:", CONVEX_URL);