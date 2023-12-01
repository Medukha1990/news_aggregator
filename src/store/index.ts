import { configureStore } from '@reduxjs/toolkit';
import { newsApi } from './api/newsApi.api';
import { NYTApi } from './api/NYT.api';
import { theGuardianApi } from './api/theGuardian.api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
	reducer: {
		[newsApi.reducerPath]: newsApi.reducer,
		[NYTApi.reducerPath]: NYTApi.reducer,
		[theGuardianApi.reducerPath]: theGuardianApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(newsApi.middleware)
			.concat(NYTApi.middleware)
			.concat(theGuardianApi.middleware),
});

setupListeners(store.dispatch);
