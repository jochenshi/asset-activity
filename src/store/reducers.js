import { combineReducers } from 'redux'

const initState = {
    isLogin: false,
    role: 'admin'
};
const userLoginReducer = (state = initState, action) => {
    if (action.type === 'TOGGLE_LOGIN') {
        return Object.assign({}, state, {isLogin: action.value})
    }
    return state
};

const initAuth = {
    authority: []
};
const authReducer = (state = initAuth, action) => {
    if (action.type === 'UPDATE_AUTHORITY') {
        return Object.assign({}, state, {authority: action.value})
    }
    return state
};

export {userLoginReducer, authReducer}