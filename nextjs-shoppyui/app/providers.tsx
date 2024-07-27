import { ReactElement } from "react";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import darkTheme from "./dark.theme";
import { AuthContext } from "./auth/auth-context";

export interface ProviderProps {
  children: ReactElement[];
  authenticated: boolean;
}

export default function Providers({ children, authenticated }: ProviderProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        <AuthContext.Provider value={authenticated}>
          {children}
        </AuthContext.Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
