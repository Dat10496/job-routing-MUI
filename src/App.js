import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainHeader from "./components/MainHeader";
import { CssBaseline } from "@mui/material";
import Router from "./routes/Router";
import { AuthProvider } from "./contexts/AuthContext";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <MainHeader />
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
