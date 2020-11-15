import timeout from './../../../utils/asyncTimeout';

/**
 * Types
 */
export const ERROR = "@app/exams/ERROR";
export const SET_LIST = "@app/exams/SET_LIST";
export const LOADING = "@app/exams/LOADING";

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
    onfetchAllexams: function () {
        return async dispatch => {
            try {
                await timeout(500);
                const list = require('../../../json/exams.json');
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
                const list = require('../../../json/exams.json').filter(item => item.id.trim().toLocaleLowerCase().includes(name.trim().toLocaleLowerCase()));
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
export const getLoading = state => state.app.exams.loading;
export const getError = state => state.app.exams.error;
export const getexams = state => state.app.exams.list;

