import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/**
 * Screens
 */
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Home from './screens/Home';
import PrivateRoute from './utils/PrivateRoute';
import NotFound from './screens/NotFound';
import { useSelector, useDispatch } from 'react-redux';
import { actions as authActions, LOGG_IN } from './redux/thunk/app/auth';

function App() {
  const state = useSelector(state=>state);  
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("staet changed",state);
  },[state]);

  useEffect(()=>{
    const isToken = localStorage.getItem('@token');
     if(isToken){
      dispatch({type:LOGG_IN});
    }
  },[]);


  return (
    <Router>
      <Suspense>
        <Switch>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <PrivateRoute path="/" exact component={Home} />
          <Route component={NotFound}/>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
