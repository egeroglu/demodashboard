/* UI */
import {
	styled,
	Typography,
	Button,
	Stack,
} from '@mui/material'

/* Icons */
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'

const NotFound = ({ theme }) => {
	return (
		<Stack
			style={{ height: 'calc(100vh + 100px)' }}
			alignItems="center"
			justifyContent="center"
		>
			<IconStyled />
			<SectionTitle>Page Not Found</SectionTitle>
			<SectionDescription>The page is missing or you assembled the link incorrectly.</SectionDescription>
				<Button
					variant="outlined"
					color="inherit"
					startIcon={ <ArrowBackOutlinedIcon /> }
					sx={{ mr: '18px' }}
					onClick={ () => window.history.back()}
				>
					Turn Back
				</Button>
		</Stack>
	)
}

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