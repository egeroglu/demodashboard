import { createTheme } from '@mui/material'
import typography from './typography'
import {
	blueGrey,
	grey
} from '@mui/material/colors'

export const lightTheme = createTheme({
	palette	: {
		mode		: 'light',
		primary	: {
			main			: '#FFFFFF',
			contrastText	: '#04042E'
		},
		text		: {
			primary	: '#04042E',
		},
		action	: {
			active	: '#04042E'
		},
		divider	: blueGrey[50],
		background	: {
			default	: grey[50]
		}
	},
	typography,
	components	: {
		MuiAvatar		: {
			styleOverrides	: {
				root	: {
					backgroundColor	: '#04042E'
				}
			}
		},
		MuiButton		: {
			styleOverrides	: {
				root	: {
					fontSize: '16px',
					fontWeight: 'bold',
					borderColor: 'rgba(4,4,46,0.5)',
				},
				startIcon	: {
					marginRight: '12px',
					'& .MuiSvgIcon-root': {
						width: '24px',
						height: '24px',
					}
				},
				endIcon	: {
					marginLeft: '12px',
					'& .MuiSvgIcon-root': {
						width: '24px',
						height: '24px',
					}
				}
			}
		},
		MuiCheckbox	: {
			styleOverrides	: {
				indeterminate: {
					'color': '#FFFFFF',
				}
			}
		},
		MuiCard		: {
			styleOverrides	: {
				root	: {
					backgroundColor: '#FFFFFF',
					borderRadius: '4px',
					boxShadow: '0px 1px 8px rgba(56, 82, 149, 0.14)'
				}
			}
		},
		MuiCardHeader	: {
			styleOverrides	: {
				title: {
					lineHeight: 1,
					fontSize: '14px',
					fontWeight: 'bold',
					textAlign: 'center'
				}
			}
		},
		MuiTextField	: {
			styleOverrides	: {
				root	: {
					marginBottom: '18px',
					'& .MuiFormLabel-root': {
						color: '#04042E'
					},
					'& label': {
						fontSize: '14px',
						transform: 'translate(18px, -9px) scale(1)'
					},
					'& fieldset': {
						color: '#F33',
						borderColor: 'rgba(4,4,46,0.25)',
						'& span': {
							padding: '10px'
						}
					},
					'& .MuiInputBase-input': {
						padding: '13px 12px',
						fontSize: '14px'
					},
					'& .Mui-focused': {
						color: '#04042E !important',
					},
					'& .Mui-focused > .MuiOutlinedInput-notchedOutline': {
						borderColor: 'rgba(4,4,46,1)'
					},
					'& .Mui-focused *': {
						borderColor: 'rgba(4,4,46,1) !important'
					}
				}
			}
		},
		MuiCssBaseline	: {
			styleOverrides	: {
				fontFamily: 'Inter'
			}
		},
		MuiMenu		: {
			styleOverrides	: {
				list	: {
					backgroundColor	: '#FFFFFF',
					borderRadius		: 4,
				},
				paper	: {
					backgroundColor	: '#FFFFFF !important',
					borderRadius		: 4,
					boxShadow			: '0px 18px 36px rgba(56, 82, 149, 0.36)'
				}
			}
		},
		MuiMenuItem		: {
			styleOverrides	: {
				root	: {
					paddingLeft	: 18,
					paddingRight	: 18,
					color		: '#04042E',
					'&:hover'		: {
						color			: '#FFFFFF',
						backgroundColor	: '#385295',
						'& .MuiListItemIcon-root'	: {
							color	: '#FFFFFF',
							opacity	: 1
						}
					}
				},
			}
		},
		MuiListItemIcon	: {
			styleOverrides	: {
				root	: {
					opacity	: 0.5
				}
			}
		},
		MuiListItemText	: {
			styleOverrides	: {
				primary	: {
					fontSize	: 14
				}
			}
		},
		MuiChip		: {
			styleOverrides	: {
				root	: {
					height			: 18,
					color			: '#FFFFFF',
					backgroundColor	: '#0085FF',
					borderRadius		: 4,
					padding			: '2px 4px',
				},
				label	: {
					fontSize		: 12,
					fontWeight	: 'bold',
					lineHeight	: 1,
					padding		: 0
				}
			}
		},
		MuiBackdrop	: {
			styleOverrides	: {
				root	: {
					background	: 'rgba(4, 4, 46, 0.9)'
				}
			}
		}
	},
})