import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const PrivateRoute= ({ component: Component, ...props  }) => {

    const authContext = useContext(AuthContext);
    const { autenticated, spinner, autenticatedUser } = authContext;
    useEffect(() => {
        autenticatedUser();
        // eslint-disable-next-line
    }, []);
    return ( 
        <Route { ...props } render={ props => !autenticated && !spinner ?  (
            <Redirect to="/" />
        )  : (
            <Component {...props} />
        ) } />

     );
}
 
export default PrivateRoute;