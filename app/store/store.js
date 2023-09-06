import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import authenticationStateReducer from "./reducers/authenticationState";
import userDetailReducer from "./reducers/userDetailState";

const reducers = combineReducers({
  authenticationState: authenticationStateReducer,
  userDetailState: userDetailReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
