import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import App from "./App";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    background: {
      paper: "#023047",
    },
    text: {
      primary: "#FFF"
    },
    primary: {
      light: '#FFF',
      main: "#D90429",
      dark: '#ba000d',
      contrastText: '#FFF'
    },
    secondary: {
      light: '#FFF',
      main: "#FFF",
      dark: '#ba000d',
      contrastText: '#000'
    }
  },
});

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <App />
      </Container>
    </ThemeProvider>
  </>,
  document.getElementById("root")
);
