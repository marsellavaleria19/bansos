
import { combineReducers } from 'redux';
import regions from './regions';
import users from './users';

const rootReducer = combineReducers({
   regions,users
});

export default rootReducer;