import {
    GET_LOGS,
    SET_LOADING,
    LOGS_ERROR,
    ADD_LOG,
    DELETE_LOG,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_LOG,
    SEARCH_LOGS
} from './types'

// const getLogs = () => {
//     return async (dispatch) => {
//         setLoading();
//         const res = await fetch('/logs');
//         const data = await res.json();
//         dispatch({
//             type: GET_LOGS,
//             payload: data
//         })
//     }
// }

//Above function can be refactored to remove first return async dispatch line
export const getLogs = () => async (dispatch) => {
    try {
        setLoading();
        const res = await fetch('/logs');
        const data = await res.json();
        dispatch({
            type: GET_LOGS,
            payload: data
        })
    } catch (err) {
        dispatch({ type: LOGS_ERROR, action: err.response.statusText })
    }
}

//Set Loading to true
const setLoading = () => {
    return {
        type: SET_LOADING
    }
}

//Add logs
export const addLogs = (log) => async (dispatch) => {
    try {
        setLoading();
        const res = await fetch('/logs',
            {
                method: 'POST',
                body: JSON.stringify(log),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        const data = await res.json();
        dispatch({
            type: ADD_LOG,
            payload: data
        })
    } catch (err) {
        dispatch({ type: LOGS_ERROR, action: err.response.statusText })
    }
}

//Delete logs from server
export const deleteLogs = (id) => async (dispatch) => {
    try {
        setLoading();
        await fetch(`/logs/${id}`,
            { method: 'DELETE', });

        dispatch({
            type: DELETE_LOG,
            payload: id

        })
    } catch (err) {
        dispatch({ type: LOGS_ERROR, action: err.response.statusText })
    }
}

//Set Current
export const setCurrent = (log) => {
    return {
        type: SET_CURRENT,
        payload: log
    }
}

//Clear Current
export const clearCurrent = () => {
    return { type: CLEAR_CURRENT }
}

//Update logs
export const updateLogs = log => async dispatch => {
    try {
        setLoading();
        const res = await fetch(`/logs/${log.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(log),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        const data = await res.json();
        dispatch({
            type: UPDATE_LOG,
            payload: data
        })
    } catch (err) {
        dispatch({ type: LOGS_ERROR, action: err.response.statusText })
    }
}

//Search logs
export const searchLogs = (text) => async dispatch => {
    try {
        setLoading();
        const res = await fetch(`/logs?q=${text}`);
        const data = await res.json();
        dispatch({
            type: SEARCH_LOGS,
            payload: data
        })
    } catch (err) {
        dispatch({ type: LOGS_ERROR, action: err.response.statusText })
    }
}