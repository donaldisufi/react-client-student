import React, { useState } from 'react';
import { Route, Redirect, NavLink } from 'react-router-dom';
import { getIsLoggin, actions as authActions } from '../redux/thunk/app/auth';
import { useSelector, useDispatch } from 'react-redux';
import { actions as studentActions } from '../redux/thunk/app/students';
import { STUDENT_REGISTER_PATH, EXAM_REGISTER_PATH, EXAMS_PATH, HOME_PATH, LOGIN_PATH } from '../common/constants';

const placeholders = {
    [HOME_PATH]:"Search Student by ID",
    [EXAMS_PATH]:"Search Exam by Student ID"
};
const pathToShowSearch = [HOME_PATH,EXAMS_PATH];

const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const isLoggedIn = useSelector(getIsLoggin);

    const onLogOut = () => {
        dispatch(authActions.logOut());
    };

    const onSearchStudent = e => {
        e.preventDefault();
        switch (rest.path) {
            case HOME_PATH:
                dispatch(studentActions.searchByName(searchValue));
                break;
            case EXAMS_PATH :
                break;
            default:
                dispatch(studentActions.searchByName(searchValue));
        }
    }
    const shouldDisplaySearch = () => {
        return pathToShowSearch.includes(rest.path);
    }
    return (
        <div className="container-home">
            <nav className="navbar navbar-dark bg-dark">
                <NavLink className="navbar-brand" to={HOME_PATH}>Home</NavLink>
                <NavLink className="navbar-brand" to={EXAMS_PATH}>Exams</NavLink>
                <NavLink className="navbar-brand" to={STUDENT_REGISTER_PATH}>Register Student </NavLink>
                <NavLink className="navbar-brand" to={EXAM_REGISTER_PATH}>Register Exam </NavLink>

                <form onSubmit={onSearchStudent} className="form-inline">
                    {shouldDisplaySearch()
                        && <>
                            <input
                                value={searchValue}
                                onChange={e => setSearchValue(e.target.value)}
                                className="form-control"
                                type="search"
                                placeholder={placeholders[rest.path]}
                                aria-label="Search"
                            />
                            <button
                                className="btn btn-info"
                                type="submit"
                            >
                                Search
                            </button>
                        </>
                    }
                </form>
                <span
                    onClick={onLogOut}
                    className="navbar-brand logout"
                >
                    Log out
                </span>
            </nav>
            <Route
                {...rest}
                render={props =>
                    isLoggedIn
                        ? (
                            <Component {...props} />
                        ) : (
                            <Redirect
                                to={{ pathname: LOGIN_PATH, state: { from: props.location } }}
                            />
                        )
                }
            />
        </div>

    )
};

export default PrivateRoute