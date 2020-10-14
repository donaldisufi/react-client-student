import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggin } from '../../../redux/thunk/app/auth';

function Register(props) {
    const isLoggedIn = useSelector(getIsLoggin);

    if (isLoggedIn) {
        return (
            <Redirect
                to={{ pathname: "/", state: { from: props.location } }}
            />
        )
    }
    return (
        <h1>
            Hello Register
        </h1>
    )
};

export default Register;