// api/newsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = '3282d8f4-7794-4cc5-85c9-ffdf9c29eafd';

export const theGuardianApi = createApi({
	reducerPath: 'theGuardianApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://content.guardianapis.com/' }),
	endpoints: (builder) => ({
		getGuardianNews: builder.query({
			query: (search: string) => ({
				url: `search?q=${search}&api-key=${apiKey}`,
			}),
		}),
	}),
});

export const { useLazyGetGuardianNewsQuery } = theGuardianApi;
