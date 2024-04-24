import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import storage from 'redux-persist/lib/storage'; // or 'redux-persist/lib/storage/session' for sessionStorage
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root', // The key for the persisted state in the storage
  storage, // Choose the storage type (e.g., local storage, session storage)
  // Optionally, you can whitelist or blacklist specific reducers
  // whitelist: ['reducerKeyToPersist'],
  // blacklist: ['reducerKeyToSkipPersist'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
