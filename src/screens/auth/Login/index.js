import "./style.scss";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggin, actions as authActions, getLoading, getError } from '../../../redux/thunk/app/auth';
import { Redirect } from 'react-router-dom';
import * as toast from '../../../common/toast';
import { HOME_PATH } from "../../../common/constants";


function Login(props) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    const isLoggedIn = useSelector(getIsLoggin);
    const loading = useSelector(getLoading);
    const error = useSelector(getError);

    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errorField, setErrorField] = useState('');

    useEffect(()=>{
       error && toast.error(error.message);
    },[error]);

    if (isLoggedIn) {
        return (
            <Redirect
                to={{ pathname: HOME_PATH, state: { from: props.location } }}
            />
        )
    }

    const onSubmit = e => {
        e.preventDefault();
        const validation = onValidateFields();

        if (validation) {
            toast.error(validation.message);
            setErrorField(validation.field);
            return;
        }

        dispatch(authActions.logInWithEmail(credentials));
    }

    const handleChange = ({ target: { value } }, key) => {
        setErrorField('');
        setCredentials((prevState) => ({
            ...prevState,
            [key]: value,
        }))
    };

    const onValidateFields = () => {
        let error = null;
        const { email, password } = credentials;

        if (!regex.test(email)) {
            return { message: "Please write a correct email address", field: 'email' }
        }
        if (password.length < 6) {
            return { message: "password should be at least 6 chars!", field: 'password' }
        }
        return error;
    };

    return (
        <div className="container">
            <div className="main">
                <form onSubmit={onSubmit}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input
                            disabled={loading}
                            value={credentials.email}
                            type="email"
                            onChange={(e) => handleChange(e, 'email')}
                            className={`form-control ${errorField === 'email' && 'border-danger'}`}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            required
                            placeholder="Enter email"
                        />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input
                            disabled={loading}
                            onChange={(e) => handleChange(e, 'password')}
                            value={credentials.password}
                            type="password"
                            className={`form-control ${errorField === 'password' && 'border-danger'}`}
                            required
                            id="exampleInputPassword1"
                            placeholder="Password"
                        />
                    </div>
                    <br />
                    <div class="form-group">
                        <button
                            disabled={loading}
                            className="btn btn-info btn-lg btn-block"
                            type="submit"
                        >
                            {loading ? "Loading..." : "Log in"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
};

export default Login;