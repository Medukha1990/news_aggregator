import React, { useState } from 'react';
import { Box, Button, Grid, Pagination, Stack } from '@mui/material';
import { News } from '../../types';
import dayjs, { Dayjs } from 'dayjs';
import NewsFilter from '../NewsFilter/NewsFilter';
import FilterListIcon from '@mui/icons-material/FilterList';
import NewsCard from '../NewsCard/NewsCard';
import SharedAlert from '../Alert/Alert';

type Props = {
	news: News[];
};

const NewsList = ({ news }: Props): JSX.Element => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isFilter, setIsFilter] = useState(false);
	const newsPerPage = 10;

	const categoriesSet = new Set(news.map((newsItem) => newsItem.category));
	const categoriesArray = Array.from(categoriesSet);

	const sourceSet = new Set(news.map((newsItem) => newsItem.source));
	const sourceArray = Array.from(sourceSet);

	const [filteredNews, setFilteredNews] = useState<News[]>([]);
	const [filtersApplied, setFiltersApplied] = useState(false);

	const displayedNews =
		filtersApplied && filteredNews.length > 0
			? filteredNews
			: news.slice(
					(currentPage - 1) * newsPerPage,
					currentPage * newsPerPage,
			  );

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number,
	) => {
		setCurrentPage(value);
	};

	const filterNews = (
		date: Dayjs | null,
		categories: string[],
		sources: string[],
	): News[] => {
		const newArray = news.filter((newsItem: News) => {
			const newsDate = dayjs(newsItem.publishedAt);
			const isSameDate =
				!date || (dayjs.isDayjs(date) && newsDate.isSame(date, 'day'));
			const isCategoryMatch =
				categories.length === 0 ||
				categories.includes(newsItem.category);
			const isSourceMatch =
				sources.length === 0 || sources.includes(newsItem.source);

			return isSameDate && isCategoryMatch && isSourceMatch;
		});

		return newArray;
	};

	const handleSaveButtonClick = (
		date: Dayjs | null,
		categories: string[],
		sources: string[],
	) => {
		const filteredArray = filterNews(date, categories, sources);
		setFilteredNews(filteredArray);
		setFiltersApplied(true);
		setIsFilter(false);

		const totalFilteredPages = Math.ceil(
			filteredArray.length / newsPerPage,
		);
		if (currentPage > totalFilteredPages) {
			setCurrentPage(totalFilteredPages);
		} else {
			setCurrentPage(1);
		}
	};

	const handleClearButtonClick = () => {
		setFilteredNews([]);
		setFiltersApplied(false);
		setIsFilter(false);
		setCurrentPage(1);
	};

	return (
		<Box>
			{!isFilter ? (
				<Box className='flex mb-6'>
					<Button
						variant='contained'
						startIcon={<FilterListIcon fontSize='large' />}
						className='cursor-pointer'
						onClick={() => setIsFilter(!isFilter)}
					>
						Filter
					</Button>
				</Box>
			) : (
				<NewsFilter
					onSave={handleSaveButtonClick}
					onClear={handleClearButtonClick}
					categories={categoriesArray}
					sources={sourceArray}
				/>
			)}
			{filtersApplied && filteredNews.length === 0 ? (
				<SharedAlert
					title='Результаты не найдены'
					description=''
					severity='info'
				/>
			) : (
				<>
					<Grid container spacing={2}>
						{displayedNews.map((item, index) => (
							<NewsCard key={index} item={item} />
						))}
					</Grid>

					{(filteredNews.length === 0 || news.length > 0) && (
						<Stack spacing={2} mt={2}>
							<Pagination
								count={Math.ceil(
									(filtersApplied
										? filteredNews.length
										: news.length) / newsPerPage,
								)}
								page={currentPage}
								onChange={handlePageChange}
							/>
						</Stack>
					)}
				</>
			)}
		</Box>
	);
};

export default NewsList;
