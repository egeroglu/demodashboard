/* UI */
import {
	styled,
	CardHeader,
	Tooltip,
	IconButton
} from "@mui/material"

/* Icons */
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

const ChartCardHeader = ({ theme, title, description, expanded, setExpanded }) => {
	const IconButtonStyle = {
		'& .MuiSvgIcon-root': {
			color: theme === 'light' ? 'rgba(4,4,46,0.5)' : 'rgba(255,255,255,0.25)',
		},
		'&:hover': {
			'& .MuiSvgIcon-root': {
				color: theme === 'light' ? 'rgba(4,4,46,1)' : 'rgba(255,255,255,1)'
			}
		}
	}

	return (
		<CardHeaderStyled
			title={ title }
			action={
				<>
					<Tooltip title={ description }>
						<IconButton sx={ IconButtonStyle }>
							<HelpOutlineIcon />
						</IconButton>
					</Tooltip>
				</>
			}
		/>
	)
}

/*  */
const CardHeaderStyled	= styled(CardHeader)(({ theme }) => ({
	padding: 0,
	height:52,
	'& .MuiCardHeader-title': {
		fontSize: '17px',
		fontWeight: 'bold',
		textAlign: 'left',
		padding: '23px 18px',

		'& div': {
			userSselect: 'none',
		}
	},
	'& .MuiCardHeader-action': {
		padding: '10px 18px',
		margin: 0
	},
	'& .MuiIconButton-root': {
		width: '36px',
		height: '36px',

		'&:first-of-type': {
			marginRight: '12px'
		},

		'& .MuiSvgIcon-root': {
			width: '24px',
			height: '24px',
		}
	}
}))

export default ChartCardHeader