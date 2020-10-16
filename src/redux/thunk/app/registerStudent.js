import timeout from './../../../utils/asyncTimeout';
import { actions as studentActions } from './students';

/**
 * Types
 */
export const ERROR = "@app/registerStudent/ERROR";
export const LOADING = "@app/registerStudent/LOADING";
export const REGISTER = "@app/registerStudent/REGISTER";
export const FORM_STATUS ="@app/registerStudent/FORM_STATUS";

/**
 * Initial state
 */
const initialState = {
    error: null,
    loading: false,
    formStatus:0
};

/**
 * Selectors
 */
export const getLoading = state => state.app.registerStudent.loading;
export const getError = state => state.app.registerStudent.error;
export const getFormStatus = state => state.app.registerStudent.formStatus;


/**
 * Reducer
 */
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case FORM_STATUS :
            return {
                ...state,
                formStatus:action.payload
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
    registerStudent: function (values) {
        return async dispatch => {
            try {
                dispatch({ type: LOADING, payload: true });
                await timeout(500);
                dispatch(studentActions.onfetchAllStudents());
                dispatch({type:FORM_STATUS,payload:200})
            }
            catch (error) {
                dispatch({ type: ERROR, payload: error });
            }
            finally {
                dispatch({ type: LOADING, payload: false });
            }
        };
    },

};

