// constants 
export const LOGG_IN = "@app/auth/LOGG_IN";
export const LOGG_OUT = "@app/auth/LOGG_OUT";


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
                ...state, isLoggedIn: true
            };
        case LOGG_OUT:
            return {
                ...state, isLoggedIn: false
            };
        default:
            return state;
    }
};
export default Reducer;

/**
 * Actions
 */
export const actions = {
    logInWithEmail: function(){
        return dispatch => {
            try {
                // do validation here 

                dispatch({ type: LOGG_IN });
            } catch (err) {
            }
        }
    },
    logOut: function(){
        return dispatch => {
            try {
                // do anything here
                localStorage.removeItem('@token');
                dispatch({ type: LOGG_OUT });
            } catch (err) {
                console.log("error logging out",err)
            }
        };
    }
};

/**
 * Selectors
 */
export const getIsLoggin = state => state.app.auth.isLoggedIn;
export const getLoading = state => state.app.auth.loading;
export const getError = state => state.app.auth.error;