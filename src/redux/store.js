import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
