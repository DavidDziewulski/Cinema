import { useStore } from "@/hooks/useStore";
import { paths } from "@/router/Router";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthToken = () => {
  const {
    isAuthenticated,
    checkAuthStatus,
    scheduleTokenRefresh,
    logout,
  } = useStore();
  const nav = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (isAuthenticated) {
      scheduleTokenRefresh();
    } else {
        console.log('here')
      logout();
      nav(paths.login);
    }
  }, [isAuthenticated, nav, logout, scheduleTokenRefresh]);

  return {
    isAuthenticated,
    logout,
  };
};
