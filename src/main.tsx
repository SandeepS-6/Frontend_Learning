import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";

const queryClinet = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClinet}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>,
);
