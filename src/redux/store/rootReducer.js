import {combineReducers} from 'redux';

import authReducer from '../thunk/app/auth';
import studentsReducer from '../thunk/app/students';
import registerStudentReducer from '../thunk/app/registerStudent';

const rootReducer = combineReducers({
    app : combineReducers({
        auth:authReducer,
        students:studentsReducer,
        registerStudent:registerStudentReducer
    })
});

export default rootReducer;