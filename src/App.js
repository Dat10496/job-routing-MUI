import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchAppBar from "./components/SearchAppBar";
import { CssBaseline } from "@mui/material";
import Router from "./components/Router";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <CssBaseline />
        <SearchAppBar />
        <Router />
      </>
    </ThemeProvider>
  );
}

export default App;
