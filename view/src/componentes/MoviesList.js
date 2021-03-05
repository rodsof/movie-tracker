import React, { useContext }  from 'react';
import { MoviesContext } from '../context/MoviesContext';
import { Grid, CircularProgress} from '@material-ui/core';
import Movie from './Movie';

const MoviesList = () => {
    const { movies, spinner} = useContext(MoviesContext);
    if(movies && !spinner){
    return ( 
        <Grid container spacing={3}>
            {movies.map( movie => (
                    <Movie 
                    movie = {movie}
                    key = {movie.imdbID}
                    />
            ))}   
        </Grid>
     );
    }
    return (
        <>
        { spinner ? <CircularProgress color="secondary"/> :
        <h1> We couldn't find what you were looking for</h1> }
        </>
    )
}
 
export default MoviesList;