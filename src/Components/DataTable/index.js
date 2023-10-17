import { useState, useRef } from 'react'
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid'

/* UI */
import {
	styled,
	Box,
	Paper,
	Toolbar,
	Typography,
	Tooltip,
	IconButton,
	LinearProgress,
	Divider,
	ToggleButtonGroup,
	ToggleButton,
	Menu,
	MenuItem
} from "@mui/material"


/* Icons */
import SearchIcon from '@mui/icons-material/Search'
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
   
const cellProgressBar = ({ value }) => {
	let progressValue = Math.floor(Math.random() * 100)
	return (
		<>
			<span>{ value }</span>
			<LinearProgress
				value={ progressValue }
				variant="determinate"
				sx={{
					width: '120px',
					ml: '8px',
					borderRadius: '4px',
					backgroundColor: 'rgba(255,255,255,0.1)',
					'& .MuiLinearProgress-bar' : {
						borderRadius: '4px',
						backgroundColor: '#6966FF'
					}
				}}
			/>
		</>
	)
}

const cellStyledValue = ({ value }) => {
	value	= value === '-' ? value : parseFloat(value)
	
	let color	= value < 1 ? '#F94960' : '#02C076'
	color	= value === 0 || value === '-' ? '#FBCC5C' : color
	
	return (
		<span style={{ color }}>{ value }</span>
	)
}

const columns = [
	{
		field		: 'col1',
		type			: 'string',
		headerName	: '2022-01-01',
		width		: 209,
		description	: 'The identification used by the person with access to the online service.',
	},
	{
		field		: 'col2',
		headerAlign	: 'left',
		align		: 'right',
		type			: 'number',
		headerName	: '2022-01-02',
		width		: 203,
	},
	{
		field		: 'col3',
		headerAlign	: 'left',
		align		: 'right',
		type			: 'number',
		headerName	: '2022-01-03 ',
		width		: 209,
	},
	{
		field		: 'col4',
		headerAlign	: 'left',
		align		: 'right',
		type			: 'number',
		headerName	: '2022-01-01',
		width		: 216,
	},
	{
		field		: 'col5',
		headerAlign	: 'left',
		align		: 'right',
		type			: 'number',
		headerName	: '2022-01-01',
		width		: 186,
	},
	{
		field		: 'col6',
		headerAlign	: 'left',
		align		: 'left',
		type			: 'number',
		headerName	: '2022-01-05',
		width		: 175,
	},
	{
		field		: 'col7',
		headerAlign	: 'left',
		align		: 'left',
		type			: 'number',
		headerName	: '2022-01-01',
		width		: 175,
	},
	{
		field		: 'col8',
		headerAlign	: 'left',
		align		: 'left',
		type			: 'number',
		headerName	: '2022-01-09',
		width		: 169
	},
	{
		field		: 'col9',
		headerAlign	: 'left',
		align		: 'left',
		type			: 'string',
		headerName	: '2022-01-10',
		width		: 173
	},
]

const rows = [
	{
		id	: 1,
		col1	: 'Youtube Views',
		col2	: 952,
		col3	: 793.325,
		col4	: 79,
		col5	: 68,
		col6	: '-2.87%',
		col7	: '-5.57%',
		col8	: 6.438,
		col9	: '486d ago',
	},
	{
		id	: 2,
		col1	: 'Youtube Subs',
		col2	: 811,
		col3	: 34.007,
		col4	: 3.83,
		col5	: 3.75,
		col6	: '34%',
		col7	: '67%',
		col8	: 4.524,
		col9	: '395d ago',
	},
	{
		id	: 3,
		col1	: 'Twitter Followers',
		col2	: 404,
		col3	: 90.342,
		col4	: .0453,
		col5	: '<.0001',
		col6	: 0,
		col7	: 0,
		col8	: 510.956,
		col9	: '934d ago',
	},
	{
		id	: 4,
		col1	: 'Discord Member',
		col2	: 395,
		col3	: 247.743,
		col4	: 13,
		col5	: 12,
		col6	: '-4.85%',
		col7	: '-17%',
		col8	: 12.952,
		col9	: '357d ago',
	},
	{
		id	: 5,
		col1	: 'Total',
		col2	: 375,
		col3	: 281.767,
		col4	: 3.24,
		col5	: 1.55,
		col6	: '-4.62%',
		col7	: '-12%',
		col8	: 34.455,
		col9	: '115d ago',
	},
	{
		id	: 6,
		col1	: 'Engagement rate',
		col2	: 270,
		col3	: 674.933,
		col4	: 68,
		col5	: 67,
		col6	: '2.29%',
		col7	: '-2.46%',
		col8	: 3.587,
		col9	: '1886d ago',
	},
	{
		id	: 7,
		col1	: 'Governace',
		col2	: 231,
		col3	: 10.299,
		col4	: .621,
		col5	: .186,
		col6	: '-62%',
		col7	: '-25%',
		col8	: 5.181,
		col9	: '317d ago',
	},
	{
		id	: 8,
		col1	: 'Telegram',
		col2	: 212,
		col3	: 141.672,
		col4	: 7.32,
		col5	: 5.99,
		col6	: '1.7%',
		col7	: '-12%',
		col8	: 9.487,
		col9	: '252d ago',
	},
	{
		id	: 9,
		col1	: 'Website view (Turkey)',
		col2	: 154,
		col3	: 5.177,
		col4	: .2556,
		col5	: .295,
		col6	: '69%',
		col7	: '112%',
		col8	: 6.556,
		col9	: '245d ago',
	},
	{
		id	: 10,
		col1	: 'Website View (Japan)',
		col2	: 152,
		col3	: 399,
		col4	: .0598,
		col5	: .049,
		col6	: '24%',
		col7	: '-',
		col8	: 2.421,
		col9	: '3d ago',
	},
]

const DataTable = ({ theme }) => {
	const searchInputRef = useRef()

	const [showSearchField, setShowSearchField] = useState(false)
	const searchToggle = () => setShowSearchField(!showSearchField)

	const [dateRange, setDateRange] = useState('1d')
	const handleChange = (event, nextView) => setDateRange(nextView)

	const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null)
	const handleOpenMobileMenu = (event) => setMobileMenuAnchorEl(event.currentTarget)
	const handleCloseMobileMenu = (data) => {
		setDateRange(data)
		setMobileMenuAnchorEl(null)
	}

	return (
		<Box>
			<PaperStyled>
				<ToolbarStyled
					sx={{
						pl: { sm: 2 },
						pr: { xs: 1, sm: 1 },
					}}
				>
					<HeaderTitle>Option 1</HeaderTitle>
					<ToggleButtonGroup
						value={ dateRange }
						onChange={ handleChange }
						exclusive
					>
					</ToggleButtonGroup>
					<IconButton onClick={ handleOpenMobileMenu } className="mobile-iconbutton">
						<MoreHorizIcon />
					</IconButton>
					<Menu
						sx={{ mt: '45px' }}
						open={ Boolean(mobileMenuAnchorEl) }
						onClose={ handleCloseMobileMenu }
						anchorEl={ mobileMenuAnchorEl }
						anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
						transformOrigin={{ vertical: 'top', horizontal: 'right' }}
						keepMounted
					>
						<MenuItem onClick={ () => handleCloseMobileMenu('1d') }>1D</MenuItem>
						<MenuItem onClick={ () => handleCloseMobileMenu('5d') }>5D</MenuItem>
						<MenuItem onClick={ () => handleCloseMobileMenu('1m') }>1M</MenuItem>
						<MenuItem onClick={ () => handleCloseMobileMenu('3m') }>3M</MenuItem>
						<MenuItem onClick={ () => handleCloseMobileMenu('6m') }>6M</MenuItem>
						<MenuItem onClick={ () => handleCloseMobileMenu('ytd') }>YTD</MenuItem>
						<MenuItem onClick={ () => handleCloseMobileMenu('1y') }>1Y</MenuItem>
						<MenuItem onClick={ () => handleCloseMobileMenu('5y') }>5Y</MenuItem>
						<MenuItem onClick={ () => handleCloseMobileMenu('all') }>All</MenuItem>
					</Menu>
					<Divider />
					<Tooltip title="Date range">
						<IconButton>
							<DateRangeOutlinedIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Search">
						<IconButton onClick={ searchToggle }>
							<SearchIcon />
						</IconButton>
					</Tooltip>
				</ToolbarStyled>
				<div style={{ width: '100%', height: 629}}>
					<DataGridStyled
						loading={ false }
						columns={ columns }
						rows={ rows }
						// density="compact"
						hideFooterSelectedRowCount
						// checkboxSelection
						// autoHeight
						// disableColumnMenu
						components={{
							Toolbar: () => (
								<Box
									sx={{
										width: '100%', 
										px: '18px',
										display: showSearchField ? 'block' : 'none'
									}}
								>
									<GridToolbarQuickFilter
										autoFocus
										inputRef={ searchInputRef }
										variant="standard"
										sx={{ minWidth: '100%' }}
									/>
								</Box>
							)
						}}
						componentsProps={{
							toolbar: {
								showQuickFilter: true,
								quickFilterProps: { debounceMs: 500 },
							},
							columnsPanel: {
								sx: {
									borderRadius: '4px',
									backgroundColor: theme === 'light' ? '#FFFFFF' : '#0B1244',
									boxShadow: theme === 'light' ? '0px 18px 36px rgba(56, 82, 149, 0.36)' : '0px 18px 24px #FF0000',
									'& .MuiDataGrid-panelHeader': {
										padding: '8px'
									},
									'& .MuiFormControl-root': {
										marginBottom: 0
									},
									'& .MuiFormLabel-root': {
										fontSize: '14px',
										color: theme === 'light' ? '#04042E' : '#FFFFFF',
										transform: 'translate(0) scale(1)'
									},
									'& .MuiInputBase-root': {
										fontSize: '14px',
										height: '36px',
										transform: 'scale(1)',

										'&:before': {
											borderColor: theme === 'light' ? 'rgba(4, 4, 46, 0.2)' : 'rgba(255, 255, 255, 0.2)'
										},
										'&:after': {
											borderColor: theme === 'light' ? '#04042E' : '#FFFFFF'
										}
									},
									'& .MuiTypography-root': {
										fontSize: '14px',
									},
									'& .MuiSwitch-thumb': {
										backgroundColor: theme === 'light' ? '#1f1f80' : '#FFFFFF'
									},
									'& .MuiSwitch-track': {
										backgroundColor: theme === 'light' ? 'rgba(4, 4, 46, 0.5)' : 'rgba(255,255,255,0.5)'
									},
									'& .MuiButton-root': {
										fontSize: '14px',
										color: theme === 'light' ? '#1f1f80' : '#FFFFFF'
									}
								}
							},
							filterPanel: {
								sx: {
									borderRadius: '4px',
									backgroundColor: theme === 'light' ? '#FFFFFF' : '#0B1244',
									boxShadow: theme === 'light' ? '0px 18px 36px rgba(56, 82, 149, 0.36)' : '0px 18px 24px #00002E',
									'& .MuiDataGrid-filterForm': {
										padding: '18px',
									},
									'& label, & .Mui-focused': {
										fontSize: '14px !important',
										color: theme === 'light' ? '#04042E' : '#FFFFFF',
										transform: 'scale(0.9)'
									},
									'& .MuiInput-root': {
										fontSize: '14px',
										height: '36px',
										transform: 'scale(1)',
										'&:before': {
											borderColor: theme === 'light' ? 'rgba(4, 4, 46, 0.2)' : 'rgba(255, 255, 255, 0.2)'
										},
										'&:after': {
											borderColor: theme === 'light' ? '#04042E' : '#FFFFFF'
										}
									},
									'& .MuiNativeSelect-select option': {
										textIndent: '44px',
										padding: '44px',
										backgroundColor: theme === 'light' ? '#FFFFFF' : '#0B1244',
									}
								}
							},
							columnMenu: {
								sx : {
									backgroundColor: theme === 'light' ? '#3D3D57' : '#3D3D57',
									boxShadow: theme === 'light' ? '0px 18px 36px #212134' : '0px 18px 24px #212134',
									'& .MuiMenuItem-root':{
										fontSize: '14px',
										lineHeight: 1,
										padding: '11px 18px',
										color: '#FAFAFD',
										'&:hover': {
											color: '#FAFAFD'
										}
									},
								}
							}
						}}
					/>
				</div>
			</PaperStyled>
		</Box>
	)
}

/*  */
const PaperStyled	= styled(Paper)(({ theme }) => ({
	width: '100%',
	backgroundColor: '#3D3D57',
	boxShadow: '#3D3D57',
	mb: 2
}))

/*  */
const ToolbarStyled	= styled(Toolbar)(({ theme }) => ({
	padding: '12px 18px !important',
	'& .MuiIconButton-root': {
		width: '36px',
		height: '36px',
		color: '#C8C7D8',
		'&:hover': {
			color: '#6966FF'
		}
	},
	'& .MuiIconButton-root:not(:last-child)': {
		marginRight: '12px'
	},
	'& .MuiSvgIcon-root': {
		width: '24px',
		height: '24px',
	},
	'& .MuiDivider-root': {
		width: '1px',
		height: '24px',
		margin: '0 18px',
		backgroundColor: '#FAFAFD',
	},
	'& .MuiToggleButtonGroup-root': {
		marginRight: 'auto'
	},
	'& .MuiToggleButton-root': {
		width: '36px',
		height: '24px',
		color: '#FAFAFD',
		padding: 0,
		fontSize: '14px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		border: 'none',
		borderRadius: '4px !important'
	},
	'& .MuiToggleButton-root:not(:last-child)': {
		marginRight: '4px',
	},
	'& .Mui-selected': {
		color: '#FAFAFD !important',
		backgroundColor: '#6966FF !important',
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
	},
	[theme.breakpoints.down('md')]: {
		padding: '18px',
		flexWrap: 'wrap',
		'& .MuiTypography-root': {
			display: 'inline-block'
		},
		'& .MuiDivider-root': {
			display: 'none'
		},
	}
}))

/*  */
const DataGridStyled	= styled(DataGrid)(({ theme }) => ({
	border: 'none',
	'& .MuiDataGrid-columnHeaderTitle': {
		color: localStorage.getItem('theme') === 'light' ? '#04042E' : '#FAFAFD',
		fontSize: '14px',
		fontWeight: 'bold'
	},
	'& .MuiDataGrid-columnHeaders, & .MuiDataGrid-cell, & .MuiDataGrid-footerContainer': {
		borderColor: localStorage.getItem('theme') === 'light' ? '#ECEFF1' : '#1A1A2C'
	},
	'& .MuiDataGrid-row:last-child .MuiDataGrid-cell': {
		border: 'none' 
	},
	'& .Mui-selected .MuiDataGrid-cell': {
		outlineColor: '#1A1A2C'
	},
	'& .MuiDataGrid-row:nth-of-type(even)': {
		backgroundColor: localStorage.getItem('theme') === 'light' ? '#FAFAFA' : '#212134' 
	},
	'& .Mui-selected .MuiDataGrid-cell, & .MuiDataGrid-row:hover': {
		color: '#FAFAFD',
		backgroundColor: '#6966FF' 
	},
	'& .MuiDataGrid-columnSeparator': {
		'& .MuiSvgIcon-root': {
			color: localStorage.getItem('theme') === 'light' ? '#ECEFF1' : '#1A1A2C'
		}
	},
	'& .MuiDataGrid-main': {
		borderTop: `1px solid ${ localStorage.getItem('theme') === 'light' ? '#ECEFF1' : '#1A1A2C' }`,
	},
	'& .MuiDataGrid-row': {
		fontSize: '14px',
	},
	'& .MuiInputBase-root': {
		marginLeft: 0
	},
	'& .MuiDataGrid-selectedRowCount, & .MuiTablePagination-selectLabel, & .MuiSelect-select, & .MuiTablePagination-displayedRows': {
		fontSize: '14px',
		color: localStorage.getItem('theme') === 'light' ? 'rgba(4, 4, 46, 0.5)' : '#C8C7D8'
	},
	'& .MuiTablePagination-selectIcon': {
		color: localStorage.getItem('theme') === 'light' ? 'rgba(4, 4, 46, 0.25)' : '#C8C7D8'
	},
	'& .MuiSelect-select:hover': {
		color: localStorage.getItem('theme') === 'light' ? 'rgba(4, 4, 46, 1)' : '#C8C7D8',
	},
	'& .MuiSelect-select:hover ~ .MuiTablePagination-selectIcon': {
		color: localStorage.getItem('theme') === 'light' ? 'rgba(4, 4, 46, 1)' : '#C8C7D8'
	},
	'& .Mui-disabled': {
		color: localStorage.getItem('theme') === 'light' ? 'rgba(4, 4, 46, 0.25) !important' : '#C8C7D8 !important'
	},
}))

/*  */
const HeaderTitle	= styled(Typography)(({ theme }) => ({
	fontSize: '20px',
	fontWeight: 'bold',
	flex: '1 1 100%',
	[theme.breakpoints.down('md')]: {
		fontSize: '16px',
		marginBottom: '8px'
	}
}))

export default DataTable