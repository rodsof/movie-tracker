import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import axiosClient from '../config/axios';
import AuthContext from './auth/AuthContext';

export const MoviesContext = createContext();

const MoviesProvider = (props) => {

    const authContext = useContext(AuthContext);
    const { user, autenticated } = authContext;
    const [spinner, setSpinner ] = useState(null);
    const [spinnerFav, setSpinnerFav ] = useState(null);

    const [userMovies, saveUserMovies] = useState([]);
    const [movies, saveMovies] = useState([]);
    const [search, searchMovies] = useState({
        title: '',
        type: ''
    });
    const [ searchMade, saveSearch] = useState(false);

    const { title, type} = search;
    if(user)
    var { _id } = user;
    useEffect(() => {
        if(autenticated && user){
            const getUserMovies = async () => {
                setSpinnerFav(true);
                try {
                    const result = await axiosClient.get('/api/users', { params: {
                        id: _id
                      }});
                      let favMovies = result.data.favMovies;
                      let res, results = [];
                      for (var i = 0 ; i < favMovies.length ; i++){
                        url = `https://www.omdbapi.com/?apikey=a2c11b79&i=${favMovies[i]}`;
                        res = await axios.get(url);
                        results.push(res.data);
                    }
                    setTimeout(() => {
                        saveUserMovies(results);
    
                        // delete spinner
                        setSpinnerFav(false);
                    }, 3000);
                }
                catch (error){
                    console.log(error);
                }
              
            }
            getUserMovies();
        }
        if(searchMade) {
            var url;

            const getMovies = async () => {
                setSpinner(true);

                if(type === 'All'){
                    url = `https://www.omdbapi.com/?apikey=a2c11b79&s=${title}`;
                }
                else{
                    url = `https://www.omdbapi.com/?apikey=a2c11b79&s=${title}&type=${type}`;
                }

                const results = await axios.get(url);
                var moviesArray = [];
                var resultsData = results.data.Search;
                for (var i = 0 ; i < resultsData.length ; i++){
                    url = `https://www.omdbapi.com/?apikey=a2c11b79&i=${resultsData[i].imdbID}`;
                    let res = await axios.get(url);
                    moviesArray.push(res.data);
                }
                
                setTimeout(() => {
                    saveMovies(moviesArray);

                    // delete spinner
                    setSpinner(false);
                }, 3000);

            }
           getMovies();
        }

    }, [search, user]);

    return ( 
        <MoviesContext.Provider
            value={{
                movies,
                userMovies,
                spinner,
                spinnerFav,
                searchMovies, 
                saveMovies,
                saveSearch,
                saveUserMovies
            }}
        >
            {props.children}
        </MoviesContext.Provider>
     );
}
 
export default MoviesProvider;