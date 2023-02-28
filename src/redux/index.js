import { combineReducers } from 'redux';
import userReducer from './slices/UserSlice';
import orgReducer from './slices/OrgSlice';

const rootReducer = combineReducers({
  user: userReducer,
  org: orgReducer,
});

export default rootReducer;
