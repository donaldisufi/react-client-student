import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggin, actions as authActions } from '../../../redux/thunk/app/auth';
import { Redirect } from 'react-router-dom';

function Login(props) {
    const isLoggedIn = useSelector(getIsLoggin);    
    const dispatch = useDispatch();

    if (isLoggedIn) {
        return (
            <Redirect
                to={{ pathname: "/", state: { from: props.location } }}
            />
        )
    }
    const onLogIn = () => {
        localStorage.setItem('@token',"TOKEN_123");
        dispatch(authActions.logInWithEmail());
    };

    return (
        <>
            <h1>
                Hello Login
            </h1>
            <button className="btn btn-danger" onClick={onLogIn}>
                Log in
            </button>
        </>
    )
};

export default Login;