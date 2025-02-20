// import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./slices/store.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
