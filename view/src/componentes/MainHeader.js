import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  image: {
    width: 95,
    height: 70,
    borderRadius: 25,
  },
}));

const MainHeader = () => {
  const classes = useStyles();


  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          href="/"
        >
          {<img src="/logo.png" className={classes.image} alt="logo"/>}
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Movies and TV shows
        </Typography>

          <Button color="inherit" href="/signup">
            SIGN UP
          </Button>
  
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
