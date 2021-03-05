import React, { useContext } from "react";
import { MoviesContext } from "../context/MoviesContext";
import { Grid, CircularProgress } from "@material-ui/core";
import Movie from "./Movie";

const FavMoviesList = () => {
  const movieContext = useContext(MoviesContext);
  const { userMovies, spinnerFav } = movieContext;

  if (userMovies.length > 0 && !spinnerFav) {
    return (
      <>
        <h1> Saved movies </h1>
        <Grid container spacing={3}>
          {userMovies.map((movie) => (
            <Movie movie={movie} key={movie.imdbID} />
          ))}
        </Grid>
      </>
    );
  }
  return(
  <>
    {spinnerFav ? (
      <CircularProgress color="secondary" />
    ) : (
      <h1> You haven't saved movies yet</h1>
    )}
  </>
  )
};

export default FavMoviesList;
