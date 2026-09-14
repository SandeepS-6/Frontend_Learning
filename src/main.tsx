import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";

const query = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
      gcTime: 1800000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={query}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>,
);
