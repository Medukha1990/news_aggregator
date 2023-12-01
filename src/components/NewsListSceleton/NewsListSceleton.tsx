import { Skeleton, Grid, Card, CardContent, CardMedia } from '@mui/material';

const NewsListSkeleton = () => {
	return (
		<Grid container spacing={2}>
			{[...Array(10).keys()].map((index) => (
				<Grid key={index} item xs={12} sm={6}>
					<Card>
						<CardMedia>
							<Skeleton
								variant='rectangular'
								height={200}
								width='100%'
							/>
						</CardMedia>
						<CardContent>
							<Skeleton variant='text' height={40} width='80%' />
							<Skeleton variant='text' height={20} width='60%' />
							<Skeleton variant='text' height={20} width='70%' />
							<Skeleton variant='text' height={20} width='50%' />
							<Skeleton variant='text' height={20} width='80%' />
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

export default NewsListSkeleton;
