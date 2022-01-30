import { combineReducers } from 'redux';
import userReducer from './slices/UserSlice';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
