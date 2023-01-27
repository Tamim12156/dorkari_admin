/* eslint-disable @typescript-eslint/no-var-requires */
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { reducer } from './reducers';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	version:1,
	storage,
  };

  const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
	reducer:persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}).concat(thunk),
	devTools: process.env.nodeENV !== 'production',
});

const makeStore = () => store;

export const persistor = persistStore(store);

export default store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<R> = ThunkAction<R, AppState, unknown, AnyAction>;