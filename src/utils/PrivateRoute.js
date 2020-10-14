import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getIsLoggin } from '../redux/thunk/app/auth';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = useSelector(getIsLoggin);

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn
                    ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{ pathname: "/login", state: { from: props.location } }}
                        />
                    )
            }
        />
    )
};

export default PrivateRoute