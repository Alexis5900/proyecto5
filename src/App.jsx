import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { CssBaseline } from "@mui/material";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <CssBaseline />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
