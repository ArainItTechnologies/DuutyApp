import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import AlertProvider from "./context/AlertContext";
import { TranslationProvider } from "./translations/TranslationProvider";
import Alert from "./components/Alert";
import Loader from "./components/Loader";
import Hooks from "./hooks/Hooks";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlertProvider>
      <UserProvider>
        <TranslationProvider>
          <App />
          <Loader />
          <Alert />
          <Hooks />
        </TranslationProvider>
      </UserProvider>
    </AlertProvider>
  </React.StrictMode>
);
