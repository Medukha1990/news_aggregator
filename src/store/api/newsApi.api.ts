import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = '10140905ca9f4b24bc25a70d5918b600';

export const newsApi = createApi({
	reducerPath: 'newsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
	endpoints: (builder) => ({
		getOpenNews: builder.query({
			query: (search: string) => ({
				url: `everything?q=${search}&apiKey=${apiKey}`,
				params: {
					per_page: 10,
				},
			}),
		}),
	}),
});

export const { useLazyGetOpenNewsQuery } = newsApi;
