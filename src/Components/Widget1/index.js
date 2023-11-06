/* UI */
import {
	Card,
	CardHeader,
	Divider,
	Typography,
	Stack,
	Box
} from '@mui/material'

/* Icons */
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const Widget1 = ({title, data}) => {
    if (!data || data.length === 0) {
        return null;
      }
    let total = data[data.length-1].value;
    let lastWeek = data[data.length-2].value;
    let change = (total-lastWeek) * 100 / total;
	return (
		<Card
			sx={{
				height: 140,
				position: 'relative'
			}}
		>
			<CardHeader
				title={title}
				sx={{
					padding: '11px 18px'
				}}
			/>
			<Divider />
			<Stack direction="row" alignItems="center" justifyContent="space-evenly" sx={{ mt: '16px' }}>
				<Box sx={{ textAlign: 'center' }}>
                    <Stack direction="row" alignItems="center" justifyContent="center">
						<Typography sx={{ fontSize: '14px' }}>Change</Typography>
					</Stack>
                        {change >= 0 ? (
                            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ color: '#02C076' }}>
                                <TrendingUpIcon sx={{ width: '32px', height: '32px', marginRight: '8px' }} />
                                <Typography sx={{ fontSize: '24px', fontWeight: 700, mb: '12px',marginTop: '10px' }}>{change.toFixed(2)}</Typography>
                            </Stack>
                        ) : (
                            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ color: '#F94960' }}>
                                <TrendingDownIcon sx={{ width: '32px', height: '18px', marginRight: '8px' }} />
                                <Typography sx={{ fontSize: '24px', fontWeight: 700, mb: '12px', marginTop: '10px' }}>{change.toFixed(2)}</Typography>
                            </Stack>
                        )}
				</Box>
				<Box>
                    <Stack direction="row" alignItems="center" justifyContent="center">
						<Typography sx={{ fontSize: '14px' }}>Total Number</Typography>
					</Stack>
					<Typography sx={{ fontSize: '24px', fontWeight: 700, mb: '12px',marginTop: '10px' }}>
						{total}
					</Typography>
				</Box>
			</Stack>
		</Card>
	)
}

export default Widget1