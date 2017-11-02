import { combineReducers, createStore } from 'redux'
import userLoginReducer from './reducers'

const reducers = combineReducers({
    userLoginState: userLoginReducer
});

const store = createStore(reducers);

export default store