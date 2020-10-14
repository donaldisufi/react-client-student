import { TOKEN_NAME } from "../../../common/constants";
import timeout from './../../../utils/asyncTimeout';    

/**
 * Types
 */
export const ERROR = "@app/auth/ERROR";
export const LOADING = "@app/auth/LOADING";
export const LOGG_IN = "@app/auth/LOGG_IN";
export const LOGG_OUT = "@app/auth/LOGG_OUT";
export const REGISTER = "@app/auth/REGISTER";

/**
 * Initial state
 */
const initialState = {
    isLoggedIn: false,
    loading: false,
    error: null
};

/**
 * Reducer
 */
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGG_IN:
            return {
                ...state,
                isLoggedIn: true,
            };
        case LOGG_OUT:
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOADING:
            return {
                ...state,
                loading: !state.loading
            }
        case ERROR:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state;
    }
};
export default Reducer;

/**
 * Actions
 */
export const actions = {    
    logInWithEmail: function (user) {
        return async dispatch => {
            try {
                dispatch({ type: LOADING });
                //TODO make reaquest for login


                await timeout(1000);
                dispatch({ type: LOGG_IN });
                localStorage.setItem(TOKEN_NAME, "@token" + user.email);
            }
            catch (err) {
                dispatch({ type: ERROR, payload: err });
            }
            finally {
                dispatch({ type: LOADING });
            }
        }
    },
    logOut: function () {
        return dispatch => {
            dispatch({ type: LOADING });
            try {
                // do anything here
                localStorage.removeItem(TOKEN_NAME);
                dispatch({ type: LOGG_OUT });
            }
            catch (err) {
                console.log("error logging out", err)
            }
            finally {
                dispatch({ type: LOADING });
            }
        };
    },
};

/**
 * Selectors
 */
export const getIsLoggin = state => state.app.auth.isLoggedIn;
export const getLoading = state => state.app.auth.loading;
export const getError = state => state.app.auth.error;

