import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

const getGlobal = () => {
  let globalVariable = "globalThis";
  try {
    // Try to import @safe-global/safe-apps-provider
    require.resolve("@safe-global/safe-apps-provider");
    // Try to import @safe-global/safe-apps-sdk
    require.resolve("@safe-global/safe-apps-sdk");
    // If both modules are found, return the custom global variable
    globalVariable = "global";
  } catch (e) {
    // If either module is not found, fallback to globalThis
    globalVariable = "globalThis";
  }
  return globalVariable;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin("all", {
      prefix: "VITE_",
    }),
  ],
  define: {
    global: process.env.NODE_ENV === "production" ? getGlobal() : "globalThis",
  },
});
