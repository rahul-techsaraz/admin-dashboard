import { configureStore,combineReducers } from "@reduxjs/toolkit";
 import categorySlice from '../features/categorySlice';
 import subHeaderMenuSlice from '../features/subHeaderMenuSlice';
import userSlice from '../features/userSlice';
const reducers = combineReducers({
  user:userSlice,
  subheadermenu: subHeaderMenuSlice,
  category:categorySlice
});
const store = configureStore({
  reducer: reducers
});

export default store;