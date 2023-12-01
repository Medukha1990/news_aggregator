import { News } from '../types';

export const processNewsData = (data: any[], source: string): News[] => {
	return data.map((item) => {
		let mappedItem: News = {
			id: item.id || '',
			source: item.source?.name || item.source || source || '',
			author: item.author || 'unknown',
			title: item.title || item.webTitle || item.snippet || '',
			description: item.description || '',
			url: item.url || item.webUrl || item.web_url || '',
			urlToImage: item.urlToImage || item?.multimedia?.[0]?.url || '',
			publishedAt:
				item.publishedAt || item.webPublicationDate || 'no date',
			content: item.content || '',
			category: item.sectionName || 'General',
		};

		return mappedItem;
	});
};
