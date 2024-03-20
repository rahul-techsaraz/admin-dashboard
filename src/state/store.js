import { configureStore,combineReducers } from "@reduxjs/toolkit";
// import productOverviewReducers from '../features/subHeaderMenuSlice';
 import subHeaderMenuSlice from '../features/subHeaderMenuSlice';
import userSlice from '../features/userSlice';
const reducers = combineReducers({
  user:userSlice,
  subheadermenu:subHeaderMenuSlice,
});
const store = configureStore({
  reducer: reducers
});

export default store;