import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider,LoadingContextProvider } from "./context/UserContext";
import AlertProvider from "./context/AlertContext";
import { TranslationProvider } from "./translations/TranslationProvider";
import {NotificationProvider} from "./context/NotificationContext";
import Loader from "./components/Loader";
import Hooks from "./hooks/Hooks";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlertProvider>
      <UserProvider>
        <LoadingContextProvider>
          <TranslationProvider>
            <NotificationProvider>
              <App />
              <Loader />
            </NotificationProvider>
            <Hooks />
          </TranslationProvider>
        </LoadingContextProvider>
      </UserProvider>
    </AlertProvider>
  </React.StrictMode>
);
