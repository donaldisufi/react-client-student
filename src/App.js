import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route,HashRouter } from 'react-router-dom';

/**
 * Screens
 */
import Login from './screens/auth/Login';
import Home from './screens/Home';
import PrivateRoute from './utils/PrivateRoute';
import NotFound from './screens/NotFound';
import { useSelector, useDispatch } from 'react-redux';
import { actions as authActions, LOGG_IN, actions, LOGG_OUT } from './redux/thunk/app/auth';
import { TOKEN_NAME, STUDENT_REGISTER_PATH, EXAM_REGISTER_PATH, STUDENT_DETAILS_PATH, HOME_PATH, LOGIN_PATH, EXAMS_PATH } from './common/constants';
import { ToastContainer } from "react-toastify";
import RegisterStudent from './screens/RegisterStudent';
import RegisterExam from './screens/RegisterExam';
import StudentDetails from './screens/StudentDetails';
import Exams from './screens/Exams';


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
        <Switch>
          <Route path={LOGIN_PATH} exact component={Login} />
          <PrivateRoute path={HOME_PATH} exact component={Home} />
          <PrivateRoute path={STUDENT_REGISTER_PATH} exact component={RegisterStudent} />
          <PrivateRoute path={EXAM_REGISTER_PATH} exact component={RegisterExam} />
          <PrivateRoute path={STUDENT_DETAILS_PATH} exact component={StudentDetails} />
          <PrivateRoute path={EXAMS_PATH} exact component={Exams} />
          <Route component={NotFound} />
        </Switch>
        <ToastContainer />
    </Router>
  );
}

export default App;
