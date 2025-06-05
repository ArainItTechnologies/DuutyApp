import React, { useContext } from "react";

import { UserContext, LoadingContext } from "../context/UserContext";
import { AlertContext } from "../context/AlertContext";

export const useUser = () => useContext(UserContext);
export const useAppState = () => useContext(LoadingContext);

export const useAlert = () => {
  const { alertState, dispatchAlert } = useContext(AlertContext);

  return {
    alertState,
    dispatchAlert,
  };
};

export default function Hook() {
  return;
}
