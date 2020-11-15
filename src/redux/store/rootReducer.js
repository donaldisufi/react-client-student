import {combineReducers} from 'redux';

import authReducer from '../thunk/app/auth';
import studentsReducer from '../thunk/app/students';
import registerStudentReducer from '../thunk/app/registerStudent';
import examsReducer from '../thunk/app/exams';

const rootReducer = combineReducers({
    app : combineReducers({
        auth:authReducer,
        students:studentsReducer,
        registerStudent:registerStudentReducer,
        exams:examsReducer
    })
});

export default rootReducer;