import {configureStore} from '@reduxjs/toolkit';
import favouritesReducer from '../features/Favourites';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

/*const store = configureStore({
    reducer: {
         favourites: favouritesReducer,
    },
     
});
export default store;*/

const persistConfig = {
  key: 'favourites',
  storage,
};

const persistedTodoReducer = persistReducer(persistConfig, favouritesReducer);
export const store = configureStore({
  reducer: {
    favourites: persistedTodoReducer, // same key as before: 'todo'
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

 
export const persistor = persistStore(store);
export default store;
