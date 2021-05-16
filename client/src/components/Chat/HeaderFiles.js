import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { AttachFile } from '@material-ui/icons'
import React from 'react'

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
			<IconButton aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
				<AttachFile />
			</IconButton>

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
