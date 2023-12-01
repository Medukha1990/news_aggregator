import { useState } from 'react';
import { Box } from '@mui/material';
import { useLazyGetNYTimesNewsQuery } from './store/api/NYT.api';
import { useLazyGetOpenNewsQuery } from './store/api/newsApi.api';
import { useLazyGetGuardianNewsQuery } from './store/api/theGuardian.api';
import { News } from './types';
import { processNewsData } from './ utils/newsUtils';
import InputSearch from './components/SearchInput/SearchInput';
import NewsList from './components/NewsList/NewsList';
import NewsListSkeleton from './components/NewsListSceleton/NewsListSceleton';
import SharedAlert from './components/Alert/Alert';

interface AppState {
	allProcessedNews: News[];
	isLoading: boolean;
}

const App = (): JSX.Element => {
	const [searchValue, setSearchValue] = useState('');
	const [{ allProcessedNews, isLoading }, setAppState] = useState<AppState>({
		allProcessedNews: [],
		isLoading: false,
	});
	const [showNoResultsAlert, setShowNoResultsAlert] = useState(false);

	const [fetchOpenNews] = useLazyGetOpenNewsQuery();

	const [fetchTheGuardian] = useLazyGetGuardianNewsQuery();

	const [fetchNYT] = useLazyGetNYTimesNewsQuery();

	const handleSearchClick = async () => {
		if (searchValue.trim() !== '') {
			try {
				setAppState((prevState) => ({ ...prevState, isLoading: true }));
				const [openNewsResult, theGuardianResult, NYTResult] =
					await Promise.all([
						fetchOpenNews(searchValue),
						fetchTheGuardian(searchValue),
						fetchNYT(searchValue),
					]);

				if (
					openNewsResult.data &&
					theGuardianResult.data &&
					NYTResult.data
				) {
					const processedOpenNews = processNewsData(
						openNewsResult.data?.articles,
						'Open News',
					);
					const processedTheGuardian = processNewsData(
						theGuardianResult.data.response.results,
						'The Guardian',
					);
					const processedNYT = processNewsData(
						NYTResult.data.response.docs,
						'The New York Times',
					);

					const allProcessedNews = [
						...processedOpenNews,
						...processedTheGuardian,
						...processedNYT,
					];

					if (allProcessedNews.length === 0) {
						setShowNoResultsAlert(true);
					} else {
						setAppState({ allProcessedNews, isLoading: false });
					}
				} else {
					console.log('Not all data is available yet');
				}
			} catch (error) {
				console.error('Error fetching news:', error);
			} finally {
				setAppState((prevState) => ({
					...prevState,
					isLoading: false,
				}));
			}
		}
	};

	const updateTextField = (newText: string) => {
		setSearchValue(newText);
		setShowNoResultsAlert(false);
	};

	return (
		<>
			<InputSearch
				onTextFieldChange={updateTextField}
				onSearchBtnClick={handleSearchClick}
				placeholder='Search the news...'
			/>
			{isLoading ? (
				<NewsListSkeleton />
			) : (
				<>
					{showNoResultsAlert && (
						<Box className='mt-2'>
							<SharedAlert
								title='No results found'
								description='No news articles were found for the given search query.'
								severity='info'
							/>
						</Box>
					)}
					{allProcessedNews.length > 0 && (
						<NewsList news={allProcessedNews} />
					)}
				</>
			)}
		</>
	);
};

export default App;
