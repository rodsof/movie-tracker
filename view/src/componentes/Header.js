import React, { useContext } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import AuthContext from "../context/auth/AuthContext";
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none'
    }
  },
  image: {
    width: 95,
    height: 70,
    borderRadius: 25,
  },
}));

const Header = () => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { logout } = authContext;

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          href="/home"
        >
          {<img src="/logo.png" className={classes.image} alt="logo"/>}
        </IconButton>
        
        <Typography variant="h6" className={classes.title}>
          Movies and TV shows
        </Typography>
        <IconButton aria-label="favorites" href="/saved">
        <FavoriteIcon color="secondary" />
        </IconButton>
          <Button color="inherit" onClick={ () => logout()}>
            LOG OUT
          </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
