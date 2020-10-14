import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/**
 * Screens
 */
import Login from './screens/auth/Login';
import Home from './screens/Home';
import PrivateRoute from './utils/PrivateRoute';
import NotFound from './screens/NotFound';
import { useSelector, useDispatch } from 'react-redux';
import { actions as authActions, LOGG_IN, actions, LOGG_OUT } from './redux/thunk/app/auth';
import { TOKEN_NAME } from './common/constants';
import { ToastContainer } from "react-toastify";


function App() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("staet changed", state);
  }, [state]);

  useEffect(() => {
    const isToken = localStorage.getItem(TOKEN_NAME);
    if (isToken) {
      dispatch({ type: LOGG_IN });
      return;
    }
    dispatch({ type: LOGG_OUT });
  },[]);


  return (
    <Router>
      <Suspense>
        <Switch>
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
        <ToastContainer />
      </Suspense>
    </Router>
  );
}

export default App;
