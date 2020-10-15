import timeout from './../../../utils/asyncTimeout';

/**
 * Types
 */
export const ERROR = "@app/students/ERROR";
export const SET_LIST = "@app/students/SET_LIST";
export const LOADING = "@app/students/LOADING";

/**
 * Initial state
 */
const initialState = {
    error: null,
    loading: true,
    list: []
};

/**
 * Reducer
 */
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            return {
                ...state,
                list: action.payload
            }
        case LOADING:
            return {
                ...state,
                loading:action.payload
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
    onfetchAllStudents: function () {
        return async dispatch => {
            try {
                await timeout(500);
                const list = require('../../../json/students.json');
                dispatch({ type: SET_LIST, payload: list });
            }
            catch (error) {
                dispatch({ type: ERROR, payload: error });
            }
            finally {
                dispatch({ type: LOADING ,payload:false});
            }
        }
    },
    searchByName: function (name) {
        return async dispatch => {
            try {
                dispatch({ type: LOADING ,payload:true});
                await timeout(500);
                const list = require('../../../json/students.json').filter(item => item.id.trim().toLocaleLowerCase().includes(name.trim().toLocaleLowerCase()));
                dispatch({ type: SET_LIST, payload: list });
            }
            catch (error) {
                dispatch({ type: ERROR, payload: error });
            }
            finally {
                dispatch({ type: LOADING,payload:false });
            }
        }
    }

};

/**
 * Selectors
 */
export const getLoading = state => state.app.students.loading;
export const getError = state => state.app.students.error;
export const getStudents = state => state.app.students.list;

