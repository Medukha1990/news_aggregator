import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { News } from '../../types';

type Props = {
	item: News;
};

const NewsCard = ({ item }: Props) => {
	return (
		<Grid key={item.id} item xs={12} sm={6}>
			<Card className='h-full flex flex-col'>
				<CardMedia
					component='img'
					height='140'
					image={item.urlToImage}
					alt={item.title}
				/>
				<CardContent className='flex-1 flex flex-col justify-between'>
					<Box className='flex flex-col'>
						<Typography
							variant='h6'
							className='text-left'
							gutterBottom
						>
							{item.title}
						</Typography>
						<Typography
							className='text-left pb-4'
							component='span'
							color='primary.main'
						>
							{dayjs(item.publishedAt).format('MMM DD, YYYY')}
						</Typography>
						<Typography
							variant='body2'
							color='textSecondary'
							className='pb-6 text-left'
						>
							{item.description}
						</Typography>
					</Box>
					<Box className='flex justify-between'>
						<Box className='flex flex-col'>
							<Box className='flex'>
								<Typography
									component='span'
									className='pr-2'
									color='textSecondary'
									sx={{
										fontSize: '12px',
									}}
								>
									Author:
								</Typography>
								<Typography
									component='span'
									sx={{
										fontSize: '12px',
									}}
								>
									{item.author}
								</Typography>
							</Box>
							<Box className='flex'>
								<Typography
									component='span'
									className='pr-2'
									sx={{
										fontSize: '12px',
									}}
									color='textSecondary'
								>
									Category:
								</Typography>
								<Typography
									component='span'
									sx={{
										fontSize: '12px',
									}}
								>
									{item.category}
								</Typography>
							</Box>
							<Box className='flex'>
								<Typography
									component='span'
									className='pr-2'
									sx={{
										fontSize: '12px',
									}}
									color='textSecondary'
								>
									Source:
								</Typography>
								<Typography
									component='span'
									sx={{
										fontSize: '12px',
									}}
								>
									{item.source}
								</Typography>
							</Box>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default NewsCard;
