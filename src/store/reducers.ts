import user from './user/user.slice';
import counter from './counter/counter.slice';
import categories from './categories/categories.slice';
import { combineReducers } from 'redux';
export const reducer = combineReducers( { user,counter,categories });
