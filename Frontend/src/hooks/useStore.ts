import { request } from "@/lib/Client/apiClient";
import { z } from "zod";
import { create } from "zustand";

type UseStore = {
  isAuthenticated: boolean;
  isLoading: boolean,
  timeoutIds:  NodeJS.Timeout[],
  setIsLoading: (loading: boolean) => void;
  setIsAuthenticated: (newValue: boolean) => void;
  saveToken: (token: string, expiration: string, refreshToken: string) => void;
  logout: () => void;
  clearAllTimeouts: () => void;
  refreshAuthToken: () => void;
  checkAuthStatus: () => void;
  scheduleTokenRefresh: () => void;
};

const ResponseValidationSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
  expiration: z.string(),
});

const TOKEN_KEY = "authToken";
const IS_AUTHENTICATED = "isAuthenticated";
const EXPIRATION_KEY = "authTokenExpiration";
const REFRESH_TOKEN_KEY = "refreshToken";

const getTimeUntilExpiration = () => {
  const expiration = localStorage.getItem(EXPIRATION_KEY);
  if (!expiration) return 0;

  const expirationDate = new Date(expiration).getTime();
  const currentTime = Date.now();

  return expirationDate - currentTime;
};

export const useStore = create<UseStore>((set, get) => {
  return{
    isAuthenticated: Boolean(localStorage.getItem(IS_AUTHENTICATED)),
    isLoading: false,
    timeoutIds: [],

    setIsLoading: (loading) => set({isLoading: loading}),
    setIsAuthenticated: (newValue) => set({ isAuthenticated: newValue }),
    saveToken: (token, expiration, refreshToken) => {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(EXPIRATION_KEY, expiration);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(IS_AUTHENTICATED, 'true');

      get().setIsLoading(false);
      get().setIsAuthenticated(true);

    },
    logout: () => {
      console.log('test');
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(EXPIRATION_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(IS_AUTHENTICATED);

      get().setIsAuthenticated(false);
      get().setIsLoading(false);
    },
    checkAuthStatus: () => {
      const token = localStorage.getItem(TOKEN_KEY);
      const timeUntilExpiration = getTimeUntilExpiration();
  
      if (token && timeUntilExpiration > 0) {
        get().setIsAuthenticated(true);
      } else {
        get().logout();
      }
      get().setIsLoading(false);
    },
  
    refreshAuthToken: async () => {
      try {
        const localRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  
        if (!localRefreshToken) {
          get().logout();
          return;
        }
  
        const response = await request({
          url: `/auth/refresh`,
          method: "post",
          schema: ResponseValidationSchema,
          data: { refreshToken: localRefreshToken },
        });
  
        const { token, expiration, refreshToken } = response;
  
        get().saveToken(token, expiration, refreshToken);
        get().scheduleTokenRefresh();
      } catch (error) {
        console.error("Błąd podczas odświeżania tokena:", error);
        get().logout();
      }
    },
  
    clearAllTimeouts: () => {
      const { timeoutIds } = get();
      timeoutIds.forEach((id) => clearTimeout(id));
      set({ timeoutIds: [] });
    },
  
    scheduleTokenRefresh: () => {
      const timeUntilExpiration = getTimeUntilExpiration();
      if (timeUntilExpiration > 0) {
        get().clearAllTimeouts();
  
        const timeoutId = setTimeout(() => {
          get().refreshAuthToken();
        }, timeUntilExpiration - 20000);
  
        set((state) => ({ timeoutIds: [...state.timeoutIds, timeoutId] }));
      }
    },
}});
