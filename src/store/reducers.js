import { combineReducers } from 'redux'

const initState = {
    isLogin: false
};
const userLoginReducer = (state = initState, action) => {
    if (action.type === 'TOGGLE_LOGIN') {
        return Object.assign({}, state, {isLogin: action.value})
    }
    return state
};

export default userLoginReducer