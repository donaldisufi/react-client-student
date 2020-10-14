import {combineReducers} from 'redux';

import authReducer from '../thunk/app/auth';
import studentsReducer from '../thunk/app/students';

const rootReducer = combineReducers({
    app : combineReducers({
        auth:authReducer,
        students:studentsReducer
    })
});

export default rootReducer;