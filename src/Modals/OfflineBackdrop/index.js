import { Offline } from 'react-detect-offline'

/* UI */
import {
	styled,
	Typography,
	Stack,
	Backdrop
} from '@mui/material'

/* Icons */
import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined'

const OfflineBackdrop = ({ theme }) => {
	return (
		<Offline >
			<Backdrop
				open={ true }
				sx={{
					zIndex: 1,
					backgroundColor: theme === 'light' ? 'rgba(236, 239, 241, 0.9)' : 'rgba(26, 26, 44, 0.9)'
				}}
			>
				<Stack
					style={{ minHeight: '100%' }}
					alignItems="center"
					justifyContent="center"
				>
					<NotificationBarStyled>
						Please check your connection settings.
					</NotificationBarStyled>
					<IconStyled />
					<SectionTitle>You are currently offline.</SectionTitle>
					<SectionDescription>We could not load the content. Check your internet connection and try again.</SectionDescription>
				</Stack>
			</Backdrop>
		</Offline>
	)
}

/*  */
const NotificationBarStyled	= styled('div')(({ theme }) => ({
	color: '#FFFFFF',
	fontSize: '16px',
	lineHeight: 1.5,
	padding: '0 18px',
	textAlign: 'center',
	backgroundColor: '#F94960',
	width: '100%',
	height: '56px',
	position: 'absolute',
	top: '56px',
	left: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}))

/*  */
const IconStyled	= styled(CloudOffOutlinedIcon)(({ theme }) => ({
	fontSize: '96px',
	marginBottom: '18px'
}))

/*  */
const SectionTitle	= styled(Typography)(({ theme }) => ({
	fontSize: '18px',
	fontWeight: 'bold',
	marginBottom: '12px',
	padding: '0 18px',
}))

/*  */
const SectionDescription	= styled(Typography)(({ theme }) => ({
	width: '288px',
	fontSize: '14px',
	textAlign: 'center',
	padding: '0 18px',
}))

export default OfflineBackdrop