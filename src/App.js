import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchAppBar from "./components/SearchAppBar";
import Routes from "./components/Routes";
import { CssBaseline } from "@mui/material";

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
        <Routes />
      </>
    </ThemeProvider>
  );
}

export default App;
