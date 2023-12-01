import { Alert, AlertTitle, AlertColor } from '@mui/material';

type Props = {
	title: string;
	description: string;
	severity: AlertColor | undefined;
};

const SharedAlert = ({ title, description, severity }: Props) => {
	return (
		<Alert severity={severity}>
			<AlertTitle>{title}</AlertTitle>
			{description}
		</Alert>
	);
};

export default SharedAlert;
