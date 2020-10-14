import React from 'react';
import { actions as authActions } from '../../redux/thunk/app/auth';
import { useDispatch } from 'react-redux';

function Home(props) {
    const dispatch = useDispatch();

    const onLogOut = () => {
            dispatch(authActions.logOut());
    };
    return (
        <>
            <h1>
                Home
            </h1>
            <button onClick={onLogOut}>
                Log out
             </button>
        </>
    )
};

export default Home;