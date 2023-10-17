/* UI */
import {
	styled,
	Typography,
	Button,
	Stack,
	IconButton
} from '@mui/material'

/* Icons */
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'

const NotFound = ({ theme }) => {
	return (
		<Stack
			style={{ height: 'calc(100vh - 112px)' }}
			alignItems="center"
			justifyContent="center"
		>
			<NotificationBarStyled>
				<IconButton
					sx={{ color: '#FFFFFF', mr: '12px' }}
					onClick={ () => window.history.back()}
				>
					<ArrowBackOutlinedIcon />
				</IconButton>
				Page not found.
			</NotificationBarStyled>
			<IconStyled />
			<SectionTitle>Page Not Found</SectionTitle>
			<SectionDescription>The page is missing or you assembled the link incorrectly.</SectionDescription>
			<StackStyled direction="row">
				<Button
					variant="outlined"
					color="inherit"
					startIcon={ <HomeOutlinedIcon /> }
					sx={{ mr: '18px' }}
				>
					GO HOME
				</Button>
				<Button
					variant="outlined"
					color="inherit"
					startIcon={ <ArrowOutwardIcon /> }
				>
					SEE REPORTS
				</Button>
			</StackStyled>
		</Stack>
	)
}

/*  */
const StackStyled	= styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down('sm')]: {
		width: '100%',
		flexDirection: 'column',
		'& .MuiButton-root':{
			width: '100%',
			'&:nth-of-type(1)':{
				marginBottom: '12px'
			}
		}
	}
}))

/*  */
const NotificationBarStyled	= styled('div')(({ theme }) => ({
	color: '#FFFFFF',
	backgroundColor: '#F94960',
	width: '100%',
	height: '56px',
	padding: '0 24px',
	position: 'absolute',
	top: '56px',
	left: 0,
	display: 'flex',
	alignItems: 'center'
}))

/*  */
const IconStyled	= styled(TravelExploreIcon)(({ theme }) => ({
	fontSize: '96px',
	marginBottom: '18px'
}))

/*  */
const SectionTitle	= styled(Typography)(({ theme }) => ({
	fontSize: '18px',
	fontWeight: 'bold',
	marginBottom: '12px'
}))

/*  */
const SectionDescription	= styled(Typography)(({ theme }) => ({
	width: '288px',
	fontSize: '14px',
	marginBottom: '18px',
	textAlign: 'center'
}))




export default NotFound