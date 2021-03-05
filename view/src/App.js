import React from "react";
import "./App.css";
import MoviesProvider from "./context/MoviesContext";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import tokenAuth from "./config/token";
import AuthState from "./context/auth/AuthState";
import Login from "./componentes/Login";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import SignUp from "./componentes/SignUp";
import LayoutHome from "./componentes/LayoutHome";
import PrivateRoute from "./componentes/routes/PrivateRoute";
import LayoutSaved from "./componentes/LayoutSaved";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#212121",
    },
    secondary: {
      light: "#757ce8",
      main: "#ff5722",
    },
  },
});

// check if there is a token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthState>
        <MoviesProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <PrivateRoute exact path="/home" component={LayoutHome} />
              <PrivateRoute exact path="/saved" component={LayoutSaved} />
            </Switch>
          </Router>
        </MoviesProvider>
      </AuthState>
    </ThemeProvider>
  );
}

export default App;
