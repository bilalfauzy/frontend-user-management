// import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './slices/index.ts';
import { Provider } from "react-redux";
import { store } from "./slices/store.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
  // <Provider store={store}>
  //   <Layout>
  //     <App />
  //   </Layout>
  // </Provider>
);
