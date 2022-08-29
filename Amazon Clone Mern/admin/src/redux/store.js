
import {configureStore,combineReducers} from "@reduxjs/toolkit"
import userReducer from "./userRedux"
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
import storage from 'redux-persist/lib/storage'
import productRedux from "./productRedux"

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  
  const rootReducers =combineReducers({user:userReducer , product:productRedux})

  const persistedReducer = persistReducer(persistConfig, rootReducers)


export const store = configureStore({
    reducer: persistedReducer ,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
