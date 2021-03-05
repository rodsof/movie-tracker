import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { deepOrange } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Grid, Typography } from "@material-ui/core";
import { MoviesContext } from "../context/MoviesContext";
import AuthContext from "../context/auth/AuthContext";

import axiosClient from "../config/axios";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "auto",
  },
  media: {
    height: 0,
    paddingTop: "120.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: deepOrange[500],
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none'
    }
  },
}));

const Movie = ({ movie }) => {
  const { Type, Year, Title, Poster, imdbID } = movie;
  const movieContext = useContext(MoviesContext);
  const { userMovies } = movieContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  if (user) var { _id } = user;
  const classes = useStyles();
  const userMoviesID = userMovies.map(({ imdbID }) => imdbID);
  let fav = userMoviesID.includes(imdbID);
  const [favorite, setFavorite] = useState(fav);

  let saveMovie = async (imdbID) => {
    try {
       await axiosClient.put("/api/users", {
        id: _id,
        imdbID: imdbID,
      });
    } catch (error) {
      console.log(error);
    }
  };
 let deleteMovie = async (imdbID) => {
    try {
      await axiosClient.delete(`/api/users/${_id}`, {
        params: { imdbID },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid item xs={4}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="movie" className={classes.avatar}>
              {Type === "movie" ? <p>M</p> : <p>TV</p>}
            </Avatar>
          }
          title={Title}
          subheader={Year}
        />
        <CardMedia className={classes.media} image={Poster} title={Title} />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="div">
            {movie.Plot ? <p>{movie.Plot}</p> : null}
            {movie.Genre ? (
              <p>
                <span>Genre: </span> {movie.Genre} <br />
              </p>
            ) : null}
            {movie.Runtime ? (
              <p>
                <span>Duration: </span> {movie.Runtime} <br />
              </p>
            ) : null}
            {movie.totalSeasons ? (
              <p>
                {" "}
                <span>Seasons: </span> {movie.totalSeasons} <br />
              </p>
            ) : null}
            {movie.Website ? (
              <p>
                <span>Where to watch? </span>
                {movie.Website}{" "}
              </p>
            ) : null}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              if (favorite)
              deleteMovie(imdbID)
              else
              saveMovie(imdbID)
              setFavorite(!favorite)
            }}
          >
            <FavoriteIcon color={favorite ? "secondary" : "primary"} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Movie;
