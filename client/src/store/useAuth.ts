import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AuthState = {
  token: string | null;
  setToken: (t: string | null) => void;
  clear: () => void;
};

export const useAuth = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      token: null,
      setToken: (t: string | null) => set({ token: t }),
      clear: () => set({ token: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;
