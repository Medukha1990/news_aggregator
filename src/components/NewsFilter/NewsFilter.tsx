import React, { useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Typography,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import MultipleSelect from '../MultipleSelect/MultipleSelect';

type Props = {
	onSave: (
		date: Dayjs | null,
		categories: string[],
		sources: string[],
	) => void;
	onClear: () => void;
	categories: string[];
	sources: string[];
};

const NewsFilter = ({ onSave, onClear, categories, sources }: Props) => {
	const [dateValue, setDateValue] = useState<Dayjs | null>(null);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedSources, setSelectedSources] = useState<string[]>([]);

	const handleSaveButtonClick = () => {
		onSave(dateValue, selectedCategories, selectedSources);
	};

	const handleClearButtonClick = () => {
		setDateValue(null);
		setSelectedCategories([]);
		setSelectedSources([]);
		onSave(null, [], []);
		onClear();
	};

	return (
		<Card className='mb-6 w-full'>
			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={12} md={4}>
						<Box className='flex flex-col items-start'>
							<Typography color='text.secondary'>
								Date:
							</Typography>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer
									components={['DatePicker', 'DatePicker']}
								>
									<DatePicker
										label='Date'
										value={dateValue}
										onChange={(value) =>
											setDateValue(value)
										}
									/>
								</DemoContainer>
							</LocalizationProvider>
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box className='flex flex-col items-start'>
							<Typography color='text.secondary' className='pb-2'>
								Category:
							</Typography>
							<MultipleSelect
								label='category'
								fields={categories}
								selectedValues={selectedCategories}
								onChange={(
									selected: React.SetStateAction<string[]>,
								) => setSelectedCategories(selected)}
							/>
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box className='flex flex-col items-start'>
							<Typography color='text.secondary' className='pb-2'>
								Source:
							</Typography>
							<MultipleSelect
								label='source'
								fields={sources}
								selectedValues={selectedSources}
								onChange={(
									selected: React.SetStateAction<string[]>,
								) => setSelectedSources(selected)}
							/>
						</Box>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions className='float-right'>
				<Button size='small' onClick={handleSaveButtonClick}>
					Save
				</Button>
				<Button size='small' onClick={handleClearButtonClick}>
					Clear
				</Button>
			</CardActions>
		</Card>
	);
};

export default NewsFilter;
