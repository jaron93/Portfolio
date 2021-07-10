import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

import preferencesReducer from "./slices/preferences";

export const rootReducer = combineReducers({
   preferences: preferencesReducer,
});

export default configureStore({
   reducer: rootReducer,
});

export const useTypedSelector: TypedUseSelectorHook<
   ReturnType<typeof rootReducer>
> = useSelector;
