import {
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	withStyles,
} from '@material-ui/core'
import { AttachFile } from '@material-ui/icons'
import React from 'react'

const LightTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.common.black,
		color: 'rgba(255,255,255)',
		boxShadow: theme.shadows[1],
		fontSize: 15,
	},
}))(Tooltip)

const HeaderFiles = () => {
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<>
			<LightTooltip title='Add files' placement='bottom'>
				<IconButton
					aria-controls='simple-menu'
					aria-haspopup='true'
					onClick={handleClick}>
					<AttachFile />
				</IconButton>
			</LightTooltip>

			<Menu
				id='simple-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<MenuItem onClick={handleClose}>Add Pic</MenuItem>
				<MenuItem onClick={handleClose}>Add Video</MenuItem>
			</Menu>
		</>
	)
}

export default HeaderFiles
