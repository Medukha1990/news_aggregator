import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

type Props = {
	label: string;
	fields: string[];
	selectedValues: string[];
	onChange: (value: string[]) => void;
};

const MultipleSelect = ({ label, fields, selectedValues, onChange }: Props) => {
	const [fieldValue, setFieldValue] = useState<string[]>([]);

	const handleChange = (event: SelectChangeEvent<typeof fieldValue>) => {
		const {
			target: { value },
		} = event;
		const newValue = typeof value === 'string' ? value.split(',') : value;

		setFieldValue(newValue);
		onChange(newValue);
	};

	return (
		<FormControl className='w-60'>
			<InputLabel id='demo-multiple-checkbox-label'>{label}</InputLabel>
			<Select
				labelId='demo-multiple-checkbox-label'
				id='demo-multiple-checkbox'
				multiple
				value={fieldValue}
				onChange={handleChange}
				input={<OutlinedInput label='Tag' />}
				renderValue={(selected) => selected.join(', ')}
				MenuProps={MenuProps}
			>
				{fields.map((item) => (
					<MenuItem key={item} value={item}>
						<Checkbox checked={fieldValue.indexOf(item) > -1} />
						<ListItemText primary={item} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default MultipleSelect;
