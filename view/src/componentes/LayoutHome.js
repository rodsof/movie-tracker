import React from 'react'
import Header from './Header'
import SearchForm from './SearchForm'
import MoviesList from './MoviesList'

const LayoutHome = (props) => {
return(
    <div className="App">
     <Header props={props}/>
     <div>
     <SearchForm />
     </div>
     <MoviesList/>
    </div>
)
}

export default LayoutHome;