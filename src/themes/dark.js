import { createTheme } from '@mui/material'
import typography from './typography'

export const darkTheme = createTheme({
	palette	: {
		mode			: 'dark',
		primary		: {
			main			: '#1A1A2C',
			contrastText	: '#FFFFFF'
		},
		text			: {
			primary	: '#FAFAFD',
		},
		action	: {
			active	: '#FAFAFD'
		},
		divider		: 'rgba(255, 255, 255, 0.1)',
		background	: {
			default	: '#1A1A2C'
		},
	},
	typography,
	components	: {
		MuiAvatar		: {
			styleOverrides	: {
				root	: {
					backgroundColor	: '#FAFAFD'
				}
			}
		},
		MuiButton	: {
			styleOverrides	: {
				root	: {
					fontSize: '16px',
					fontWeight: 'bold',
					borderColor: '#3D3D57',
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
				root: {
					'color': '#FAFAFD',
				},
				'indeterminate': {
					'color': '#FAFAFD',
				},
			}
		},
		MuiCard		: {
			styleOverrides	: {
				root	: {
					backgroundColor: '#3D3D57',
					borderRadius: '4px',
					boxShadow: 'none'
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
						color: '#FFFFFF'
					},
					'& label': {
						fontSize: '14px',
						transform: 'translate(18px, -9px) scale(1)'
					},
					'& fieldset': {
						color: '#C8C7D8',
						borderColor: '#C8C7D8',
						'& span': {
							padding: '10px'
						}
					},
					'& .MuiInputBase-input': {
						padding: '13px 12px',
						fontSize: '14px'
					},
					'& .Mui-focused': {
						color: '#C8C7D8 !important',
					},
					'& .Mui-focused > .MuiOutlinedInput-notchedOutline': {
						borderColor: 'rgba(255,255,255,1)',
					},
					'& .Mui-focused *': {
						borderColor: 'rgba(255,255,255,1) !important'
					}
				}
			}
		},
		MuiCssBaseline	: {
			styleOverrides	: {
				fontFamily: 'Inter'
			}
		},
		MuiDrawer		: {
			styleOverrides	: {
				paper	: {
					background	: '#3D3D57'
				}
			}
		},
		MuiMenu		: {
			styleOverrides	: {
				list	: {
					backgroundColor	: '#212134',
					borderRadius		: 4,
				},
				paper	: {
					backgroundColor	: '#212134 !important',
					borderRadius		: 4,
					boxShadow			: '0px 18px 24px #1A1A2C'
				}
			}
		},
		MuiMenuItem		: {
			styleOverrides	: {
				root	: {
					paddingLeft	: 18,
					paddingRight	: 18,
					color		: 'rgba(255, 255, 255, 0.5)',
					'&:hover'		: {
						color			: 'rgba(255, 255, 255, 1)',
						backgroundColor	: '#2635A9',
						'& .MuiListItemIcon-root'	: {
							opacity	: 1
						}
					},
				},
			}
		},
		MuiListItemIcon	: {
			styleOverrides	: {
				root	: {
					opacity	: 0.25
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
					backgroundColor	: '#6966FF',
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
					background	: 'rgba(33, 33, 52, 0.9)'
				}
			}
		}
	}
})
