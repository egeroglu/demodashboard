import { useState } from 'react'
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

/* UI */
import {
	styled,
	AppBar,
	Toolbar,
	Button,
	IconButton,
	Tooltip,
	Menu,
	MenuItem,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material'

/* Icons */
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AppsIcon from '@mui/icons-material/Apps'

import logo from '../../assets/logos/logo.svg'
import mobileLogo from '../../assets/images/mark.svg';
import data from '../../assets/data/datalist'

const Header = ({ theme }) => {
	const isMobile = window.innerWidth <= 768;

	const [dataList, setDataList] = useState(data)

	const logout = () => {
		Cookies.remove('token');
	}

	const [browseMenuAnchorEl, setBrowseMenuAnchorEl] = useState(null)
	const handleOpenBrowseMenu = (event) => setBrowseMenuAnchorEl(event.currentTarget)
	const handleCloseBrowseMenu = () => setBrowseMenuAnchorEl(null)

	return (
		<AppBarStyled position="fixed">
			<Toolbar style={{ minHeight: 56}}>
				<Link to="">
					{isMobile ? (
						<img
							src={mobileLogo}
							alt="dydx"
							className="logo"
							style={{ paddingTop: "20%", width:"130%", marginLeft:"0%" }}
						/>
					) : (
						<img
							src={logo}
							alt="dydx"
							className="logo"
							style={{ paddingTop: "2%", width:"30%", marginLeft:"5%" }}
						/>
					)}
				</Link>
				
				<IconButton
					className="browse-iconbutton"
					onClick={ handleOpenBrowseMenu }
				>
					<AppsIcon />
				</IconButton>

				<Button
					className="browse-button"
					color="inherit"
					variant="outlined"
					onClick={ handleOpenBrowseMenu }
					style={{
						marginLeft: -200,
						marginRight: 'auto',
						textTransform: 'none',
						fontSize: 16,
						fontWeight: 'bold',
						padding: '6px 18px'
					}}
				>
					Choose
					<ArrowDropDownIcon sx={{ ml: '12px' }} />
				</Button>
				<Menu
					sx={{ mt: '45px' }}
					anchorEl={ browseMenuAnchorEl }
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					open={ Boolean(browseMenuAnchorEl) }
					onClose={ handleCloseBrowseMenu }
				>
					
					<List sx={{ pb: 0 }}>
							{
								dataList.map(({ id, parent_id, link, icon: Icon, title, color }, index) => {
									let startColor	= theme === 'dark' ? '#3D3D57' : '#FFFFFF'
									if(parent_id === 0){
										return (
											<ChildListItemButton key={ index }>
												<ListItemText primary="No results found..." />
											</ChildListItemButton>
										)
									}else if(!parent_id){
										return (
											<Link to={link} style={{ textDecoration: 'none' }}>
												<ParentListItemButtonStyled
													key={ id }
													sx={{
														background: `linear-gradient(90deg, ${ startColor } 0%, ${ color } 100%)`,
													}}
												>            
													<ListItemTextStyled
														primary={ title }
														primaryTypographyProps={{
															style: { fontSize: '15px', fontWeight: 'bold' }
														}}
														sx={{ m: 0 }}
													/>
												</ParentListItemButtonStyled>
											</Link>
											
										)
									}else{
										return (
											<nav className='nav'>
												<Link to={link}>
													<ChildListItemButton key={ index }>
														<ListItemText primary={ title } sx={{ m: 0, lineHeight: 1 }} />
													</ChildListItemButton>
												</Link>
											</nav>
										)
									}
								})
							}
					</List>
				</Menu>
				<Tooltip title="Logout" arrow>
					<MenuItem component="a" href="/" onClick={logout}>
						<ListItemIcon>
						<LogoutOutlinedIcon />
						</ListItemIcon>
					</MenuItem>
				</Tooltip>
			</Toolbar>
		</AppBarStyled>
	)
}

const AppBarStyled	= styled(AppBar)(({ theme }) => ({
	background: "#1A1A2C",
	borderBottom: '1px solid #3D3D57',
	boxShadow: localStorage.getItem('theme') === 'light' ? '0px 1px 8px rgba(56, 82, 149, 0.14)' : 'none',
	'& .MuiIconButton-root': {
		width: '36px',
		height: '36px',

		'& .MuiSvgIcon-root': {
			width: '24px',
			height: '24px',
		}
	},
	'& .browse-iconbutton': {
		display: 'none',
	},
	[theme.breakpoints.down('sm')]: {
		'& .logo': {
			width: '36px',
			height: '36px',
			objectFit: 'cover',
			objectPosition: 'left'
		},
		'& .browse-button, & .theme-iconbutton': {
			display: 'none'
		},
		'& .browse-iconbutton': {
			display: 'flex',
			marginLeft: 'auto',
			marginRight: '12px'
		},
		'& .avatar-iconbutton': {
			marginLeft: '12px',
			marginRight: 0,
			order:2
		},
		'& .language-iconbutton': {
			marginRight: 0
		},
	}
}))

/*  */
const ParentListItemButtonStyled	= styled(ListItemButton)(({ theme }) => ({
	maxWidth: '100%',
	padding: '6px 18px',
	color: localStorage.getItem('theme') === 'light' ? 'rgba(5,5,47,0.75)' : '#FAFAFD',
	'.KeyboardArrowRightOutlinedIcon'	: {
		width: 24,
		height: 24,
		opacity: localStorage.getItem('theme') === 'light' ? 0.5 : 0.25
	},
	'&:hover': {
		color: '#FFFFFF',
		backgroundColor	: localStorage.getItem('theme') === 'light' ? '#385295' : '#6966FF',
		'.KeyboardArrowRightOutlinedIcon'	: {
			opacity: 1,
		},
	},
}))

/*  */
const ChildListItemButton	= styled(ListItemButton)(({ theme }) => ({
	padding: '6px 18px',
	color: localStorage.getItem('theme') === 'light' ? 'rgba(5,5,47,0.75)' : 'rgba(255,255,255,0.5)',
	'.KeyboardArrowRightOutlinedIcon'	: {
		width: 24,
		height: 24,
		opacity: localStorage.getItem('theme') === 'light' ? 0.5 : 0.25
	},
	'&:hover': {
		color: '#FFFFFF',
		backgroundColor	: localStorage.getItem('theme') === 'light' ? '#385295' : '#6966FF',
		'.KeyboardArrowRightOutlinedIcon'	: {
			opacity: 1,
		},
	},
}))

/*  */
const ListItemTextStyled	= styled(ListItemText)(({ theme }) => ({
}))

export default Header