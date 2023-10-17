import { useState } from 'react'

/* UI */
import {
	styled,
	IconButton,
	CardActions,
	Divider,
	ToggleButtonGroup,
	ToggleButton,
	Menu,
	MenuItem
} from "@mui/material"

/* Icons */
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined'
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined'

const ChartCardFooter = ({ theme, lastUpdate, exportChart, printChart, fullScreenChart }) => {
	const [dateRange, setDateRange] = useState('1d')
	const handleChange = (event, nextView) => setDateRange(nextView)

	const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null)
	const handleOpenMobileMenu = (event) => setMobileMenuAnchorEl(event.currentTarget)
	const handleCloseMobileMenu = (data) => {
		setDateRange(data)
		setMobileMenuAnchorEl(null)
	}
	return (
		<CardActionsStyled>
			<IconButton onClick={ handleOpenMobileMenu } className="mobile-iconbutton">
				<MoreHorizIcon />
			</IconButton>
			

			<IconButton onClick={ exportChart }>
				<FileDownloadOutlinedIcon />
			</IconButton>
			<IconButton onClick={ printChart }>
				<LocalPrintshopOutlinedIcon />
			</IconButton>
			<IconButton onClick={ fullScreenChart }>
				<FullscreenOutlinedIcon />
			</IconButton>
		</CardActionsStyled>
	)
}

/*  */
const CardActionsStyled	= styled(CardActions)(({ theme }) => ({
	padding: '6px 18px',

	'& .MuiIconButton-root': {
		width: '36px',
		height: '24px',
		align: 'left',

		'&:nth-of-type(2n-2)': {
			margin: '0 4px 0 12px'
		},
		'& .MuiSvgIcon-root': {
			width: '24px',
			height: '24px',
			color: localStorage.getItem('theme') === 'light' ? 'rgba(4,4,46,0.5)' : 'rgba(255,255,255,0.25)',
		},
		'&:hover': {
			'& .MuiSvgIcon-root': {
				color: localStorage.getItem('theme') === 'light' ? 'rgba(4,4,46,1)' : 'rgba(255,255,255,1)'
			}
		}
	},
	'& .MuiDivider-root': {
		width: '1px',
		height: '20px',
		margin: '0 12px',
		backgroundColor: localStorage.getItem('theme') === 'light' ? 'rgba(4,4,46,0.2)' : 'rgba(255,255,255,0.2)'
	},
	'& .MuiToggleButtonGroup-root': {
		marginRight: 'auto'
	},
	'& .MuiToggleButton-root': {
		width: '600px',
		height: '20px',
		color: localStorage.getItem('theme') === 'light' ? 'rgba(4, 4, 46, 0.5)' : 'rgba(255, 255, 255, 0.5)',
		padding: 0,
		fontSize: '14px',
		display: 'flex',
		alignItems: 'left',
		justifyContent: 'left',
		border: 'none',
		borderRadius: '4px !important',
		'& :hover': {
			color: localStorage.getItem('theme') === 'light' ? 'rgba(4, 4, 46, 1)' : 'rgba(255, 255, 255, 1)',
		}
	},
	'& .MuiToggleButton-root:not(:last-child)': {
		marginRight: '4px'
	},
	'& .Mui-selected': {
		color: '#FFFFFF !important',
		backgroundColor: '#1E2A8A !important',
		fontWeight: 'bold',
		'&:hover': {
			fontWeight: 'bold'
		}
	},
	'& .mobile-iconbutton': {
		display: 'none'
	},

	[theme.breakpoints.down('sm')]: {
		'& .MuiToggleButtonGroup-root': {
			display: 'none'
		},
		'& .mobile-iconbutton': {
			display: 'flex',
			marginRight: 'auto'
		}
	}
}))

export default ChartCardFooter