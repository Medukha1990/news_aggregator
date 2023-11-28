import { useState } from 'react';
import InputSearch from '../InputSearch/InputSearch';
import { Box } from '@mui/material';

const NewsPage = () => {
	const [searchValue, setSearchValue] = useState('');

	const updateTextField = (newText: string) => {
		setSearchValue(newText);
	};

	return (
		<Box>
			<InputSearch
				onTextFieldChange={updateTextField}
				placeholder='Search the news...'
			/>
		</Box>
	);
};

export default NewsPage;
