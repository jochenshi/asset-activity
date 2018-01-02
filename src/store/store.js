import { combineReducers, createStore } from 'redux'
import {userLoginReducer, authReducer} from './reducers'

const reducers = combineReducers({
    userLoginState: userLoginReducer,
    authArray: authReducer
});

const store = createStore(reducers);

export default store