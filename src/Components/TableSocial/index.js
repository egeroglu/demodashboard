import { useState, useRef } from 'react'
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid'

/* UI */
import {
	styled,
	Box,
	Paper,
	Toolbar,
	Typography,
	IconButton,
	ToggleButtonGroup,
} from "@mui/material"


/* Icons */
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const TableSocial = ({ theme, dataTable, title, tableHeight }) => {
	let columnArray = [];
	const dataRows = dataTable.slice(1);

	if (Array.isArray(dataTable) && dataTable.length > 0) {
	  columnArray = Object.values(dataTable[0]);
	} else {
	  return null;
	}
	
	const columnsNew = columnArray.slice(1).map((date, index) => ({
	  field: `col${index + 1}`,
	  headerName: date,
	  width: index === 0 ? 225 : 180,
	  type: index === 0 ? 'string' : 'number',
	  headerAlign: 'right',
	  align: 'right'
	}));

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
					<HeaderTitle>{title}</HeaderTitle>
					<ToggleButtonGroup
						value={ dateRange }
						onChange={ handleChange }
						exclusive
					>
					</ToggleButtonGroup>
					<IconButton onClick={ handleOpenMobileMenu } className="mobile-iconbutton">
						<MoreHorizIcon />
					</IconButton>
				</ToolbarStyled>
				<div style={{ width: '100%', height: tableHeight}}>
					<DataGridStyled
						loading={ false }
						columns={ columnsNew }
						rows={ dataRows }
						rowsPerPageOptions={[5]}
						// density="compact"
						hideFooter
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

export default TableSocial