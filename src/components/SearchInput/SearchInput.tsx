import { useState } from 'react';
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
	onTextFieldChange: (newText: string) => void;
	onSearchBtnClick: () => void;
	placeholder: string;
};

const InputSearch = ({
	onSearchBtnClick,
	onTextFieldChange,
	placeholder,
}: Props): JSX.Element => {
	const [textContent, setTextContent] = useState('');

	return (
		<TextField
			placeholder={placeholder}
			id='outlined-basic'
			variant='outlined'
			className='py-2 h-[42px] mb-2 w-full relative'
			style={{ marginBottom: '40px' }}
			onChange={(event) => {
				setTextContent(event.target.value);
				onTextFieldChange(event.target.value);
			}}
			value={textContent}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<SearchIcon data-testid='search-icon' />
					</InputAdornment>
				),
				endAdornment: (
					<InputAdornment
						position='end'
						className='h-full min-h-full'
					>
						<Button
							variant='text'
							className='h-full '
							style={{ margin: '-12px' }}
							onClick={onSearchBtnClick}
						>
							Search
						</Button>
					</InputAdornment>
				),
			}}
		/>
	);
};

export default InputSearch;
