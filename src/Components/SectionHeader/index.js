import { useState } from 'react'

/* UI */
import {
	styled,
	Stack,
	Typography,
	Button,
	Menu,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ToggleButtonGroup,
	ToggleButton,
	Checkbox,
} from '@mui/material'

/* Icons */
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const SectionHeader = ({ theme, chartList, activeCharts, toggleChartItem, activeCurrency, setActiveCurrency, currencies }) => {

	const [chartMenuAnchorEl, setChartMenuAnchorEl] = useState(null)
	const handleOpenChartMenu = (event) => setChartMenuAnchorEl(event.currentTarget)
	const handleCloseChartMenu = () => setChartMenuAnchorEl(null)

	return (
		<StackStyled direction="row">
			
			<Menu
				sx={{ mt: '45px' }}
				open={ Boolean(chartMenuAnchorEl) }
				onClose={ handleCloseChartMenu }
				anchorEl={ chartMenuAnchorEl }
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				keepMounted
			>
				{
					chartList.map(({ id, title }, index) => {
						let isChecked	= activeCharts.indexOf(id) !== -1
						return (
							<ListItem
								key={ index }
								disablePadding
								sx={{ px: 0 }}
							>
								<ListItemButton
									divider={ chartList.length - 1 !== index }
									sx={{
										padding: '0 18px',
										color: isChecked ? (theme === 'light' ? '#FFFFFF' : '#FFFFFF') : (theme === 'light' ? '#04042E' : 'rgba(255,255,255,0.5)'),
										backgroundColor: isChecked ? (theme === 'light' ? '#385295' : '#2635A9') : (theme === 'light' ? '#FFFFFF' : '#0B1244'),
										'&:hover'	: {
											backgroundColor: isChecked ? (theme === 'light' ? '#385295' : '#2635A9') : (theme === 'light' ? '#FFFFFF' : '#0B1244'),
										},
										'& .MuiSvgIcon-root' : {
											color: isChecked ? (theme === 'light' ? '#FFFFFF' : '#FFFFFF') : (theme === 'light' ? 'rgba(4,4,46,0.25)' : 'rgba(255,255,255,0.25)')
										},
									}}
									role={undefined}
									onClick={ () => toggleChartItem(id) }
									dense
								>
									<ListItemIcon sx={{ minWidth: 24, height: 36, opacity: 1 }}>
										<Checkbox
											color="primary"
											icon={ <RadioButtonUncheckedIcon sx={{ width: 24, height: 24 }} /> }
											checkedIcon={ <CheckCircleIcon sx={{ width: 24, height: 24 }} /> }
											sx={{ p:0, ml:0, mr: '12px' }}
											edge="start"
											checked={ isChecked }
											tabIndex={ -1 }
											disableRipple
											inputProps={{ 'aria-labelledby': id }}
										/>
									</ListItemIcon>
									<ListItemText id={ id } primary={ title } />
								</ListItemButton>
							</ListItem>
						)
					})
				}
			</Menu>

		</StackStyled>
	)
}


/*  */
const StackStyled	= styled(Stack)(({ theme }) => ({
	margin: '10px 0',
	'& .MuiTypography-root + .MuiButton-root': {
		marginLeft: 'auto',
		marginRight: '18px',
	},
	[theme.breakpoints.down('md')]: {
		flexWrap: 'wrap',
		'& .MuiTypography-root': {
			minWidth: '100%',
			marginBottom: '12px'
		},
		'& .MuiButton-root': {
			width: '100%',
			margin: 0
		},
		'& .MuiTypography-root + .MuiButton-root': {
			margin: '0 0 12px 0'
		},
	}
}))

/*  */
const ToggleButtonStyled	= styled(ToggleButton)(({ theme }) => ({
	alignSelf: 'center',
	padding: '6px 18px',
	fontSize: 14,
	fontWeight: 'bold',
	borderColor: '#3D3D57',
	'&:hover, &.Mui-selected, &.Mui-selected:hover'	: {
		color: '#FFFFFF',
		backgroundColor: '#6966FF'
	}

}))

export default SectionHeader