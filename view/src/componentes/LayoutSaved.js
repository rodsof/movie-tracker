import React from 'react'
import Header from './Header'
import FavMoviesList from './FavMoviesList'

const LayoutSaved = (props) => {
return(
    <div className="App">
     <Header props={props}/>
       <FavMoviesList />
    </div>
)
}

export default LayoutSaved;