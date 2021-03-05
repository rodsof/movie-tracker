import React, { useState, useContext, useEffect } from "react";
import {
  Link,
  makeStyles,
  Container,
  Checkbox,
  Grid,
  Typography,
  Button,
  FormControlLabel,
  TextField,
  CssBaseline,
  Avatar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AuthContext from "../context/auth/AuthContext";
import Alert from "@material-ui/lab/Alert";
import MainHeader from "./MainHeader";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { message, autenticated, createUser, spinner } = authContext;

  useEffect(() => {
    if (autenticated && !spinner) {
      props.history.push("/home");
    }
    // eslint-disable-next-line
  }, [message, autenticated, props.history]);

  // state to sign up
  const [user, saveUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: ""
  });

  // extract from user
  const { name, email, password, confirm, error } = user;

  const onChange = (e) => {
    saveUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // when login
  const onSubmit = (e) => {
    e.preventDefault();
    if(password !== confirm){
        saveUser({
          ...user,
          error: "There is an error, passwords must be = "
        })
        return;
    }
    // to action
    createUser({ name, email, password });
  };

  return (
    <>
    <MainHeader />
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} validate="true" onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm"
            label="Repeat Password"
            type="password"
            id="confirm"
            onChange={onChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
                    {message? <Alert severity="error">{message.msg}</Alert> : null}

          {error ? <Alert severity="error">{error}</Alert> : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Do you already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </>
  );
};
export default SignUp;
