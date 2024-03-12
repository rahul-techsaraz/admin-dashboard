import { configureStore,combineReducers } from "@reduxjs/toolkit";
// import productOverviewReducers from '../features/subHeaderMenuSlice';
 import subHeaderMenuSlice from '../features/subHeaderMenuSlice';
// import propertyDetailsReducers from '../features/propertyDetails'
const reducers = combineReducers({
 // productoverview:productOverviewReducers,
  subheadermenu:subHeaderMenuSlice,
 // propertydetails:propertyDetailsReducers
});
const store = configureStore({
  reducer: reducers
});

export default store;