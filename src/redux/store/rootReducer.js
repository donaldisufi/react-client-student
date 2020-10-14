import {combineReducers} from 'redux';

import authReducer from '../thunk/app/auth';

const rootReducer = combineReducers({
    app : combineReducers({
        auth:authReducer,
    })
});

export default rootReducer;