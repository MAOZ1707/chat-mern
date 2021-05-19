import React, { useState } from 'react'

import { useAuth } from '../../context/authContext'

import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import BackgroundTheme from '../../UiElements/BackgroundTheme/BackgroundTheme'
import Modal from '../../UiElements/Modal/Modal'

const HeaderOptions = () => {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [openModal, setOpenModal] = useState(false)
	const { logout } = useAuth()

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleModalClick = () => {
		setAnchorEl(null)
		setOpenModal(true)
	}

	return (
		<>
			<Modal open={openModal} onClose={() => setOpenModal(false)}>
				<BackgroundTheme />
			</Modal>

			<IconButton aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
				<MoreVert />
			</IconButton>

			<Menu
				id='simple-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<MenuItem onClick={handleModalClick}>Background</MenuItem>
				<MenuItem onClick={handleClose}>Saved message</MenuItem>
				<MenuItem onClick={() => logout()}>Logout</MenuItem>
			</Menu>
		</>
	)
}

export default HeaderOptions
