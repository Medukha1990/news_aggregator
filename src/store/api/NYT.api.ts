import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = 'ATAJvdpnzcFXpghFy9OhKG46x1nblM9W';

export const NYTApi = createApi({
	reducerPath: 'NYTApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.nytimes.com/svc/search/v2/',
	}),
	endpoints: (builder) => ({
		getNYTimesNews: builder.query({
			query: (search: string) => ({
				url: `articlesearch.json?q=${search}&api-key=${apiKey}`,
			}),
		}),
	}),
});

export const { useLazyGetNYTimesNewsQuery } = NYTApi;
