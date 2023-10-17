import { useState } from 'react'

/* UI */
import {
	styled,
	Stack,
	Avatar,
	Box,
	Typography,
	ToggleButtonGroup,
	ToggleButton,
} from '@mui/material'


const PageHeader = ({ pageTitle}) => {

	const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false)
	const selectMenuToggle = () => setSelectMenuIsOpen(!selectMenuIsOpen)

	return (
		<StackStyled direction="row">
			<Box>
				<Stack direction="row" alignItems="center" spacing="12px">
					<TypographyStyled>
						{ pageTitle }
					</TypographyStyled>
				</Stack>
			</Box>
		</StackStyled>
	)
}

/*  */
const StackStyled	= styled(Stack)(({ theme }) => ({
	marginTop: '25px',
	marginBottom: '0',
	[theme.breakpoints.down('md')]: {
		flexWrap: 'wrap',
		position: 'relative',
		textAlign: 'center',
		'& > .MuiAvatar-root:first-of-type': {
			width: '96px',
			height: '96px',
			margin: 'auto'
		},
		'& .MuiBox-root': {
			minWidth: '100%',
			margin: '12px 0',

			'& > div': {
				display: 'flex',
				flexWrap: 'wrap',
			},

			'& .MuiFormControl-root, & .MuiAvatarGroup-root': {
				display: 'inline-flex',
				margin: 'auto'
			},

			'& .MuiIconButton-root': {
				position: 'absolute',
				top: 0,
				right: 0,
			},

			'& .MuiTypography-root': {
				minWidth: '100%'
			},
		},
		'& .MuiToggleButtonGroup-root': {
			minWidth: '100%',
			'& .MuiToggleButton-root':{
				flex: 1
			}
		}
	}
}))


/*  */
const TypographyStyled	= styled(Typography)(({ theme }) => ({
	fontSize: '36px',
	fontWeight: 'bold'
}))


export default PageHeader