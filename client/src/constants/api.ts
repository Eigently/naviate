console.log("node env: ", process.env.NODE_ENV);

export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : process.env.NEXT_PUBLIC_API_SERVER || "https://api.naviate.xyz";
