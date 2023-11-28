import { useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
	onTextFieldChange: (newText: string) => void;
	placeholder: string;
};

const InputSearch = ({
	onTextFieldChange,
	placeholder,
}: Props): JSX.Element => {
	const [textContent, setTextContent] = useState('');

	return (
		<TextField
			placeholder={placeholder}
			id='outlined-basic'
			variant='outlined'
			className='py-2 px-4 w-full h-[42px] mb-2'
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
			}}
		/>
	);
};

export default InputSearch;
