import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist'
import localStorage from 'redux-persist/lib/storage';

import preferencesReducer from './slices/preferences';
import userReducer from './slices/user';

const PersistConfig = {
   key: 'root',
   storage: localStorage,
};

const rootReducer = combineReducers({
   preferences: preferencesReducer,
   user: userReducer,
});

const persistedReducer = persistReducer(PersistConfig, rootReducer);


const store = configureStore({
   reducer: persistedReducer,
   middleware: getDefaultMiddleware({
      serializableCheck: {
         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
   }),
   devTools: true
});

const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export { store, persistor };

export default persistedReducer;