import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import "./index.css";

const Home = lazy(() => import("./routes/Home"));
const Forecast = lazy(() => import("./routes/Forecast"));

const router = createBrowserRouter([
  {
    path: "/weather-app-vite",
    element: (
      <Suspense fallback={<div className="flex justify-center p-10">Loading...</div>}>
        <App />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "forecast", element: <Forecast /> },
    ],
  },
  {
    path: "*",
    element: (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Page Not Found
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
