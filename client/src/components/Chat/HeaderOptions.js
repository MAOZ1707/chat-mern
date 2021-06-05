import React, { useState } from 'react'

import { useAuth } from '../../context/authContext'

import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import BackgroundTheme from '../../UiElements/BackgroundTheme/BackgroundTheme'
import Modal from '../../UiElements/Modal/Modal'
import StarMessages from './StarMessages'

import { LightTooltip } from '../../utils/materialUI/style'

const HeaderOptions = () => {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [openBgModal, setOpenBgModal] = useState(false)
	const [openStarModal, setOpenStartModal] = useState(false)
	const { logout } = useAuth()

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleModalClick = () => {
		setAnchorEl(null)
		setOpenBgModal(true)
	}
	const handleStarMessageClick = () => {
		setAnchorEl(null)
		setOpenStartModal(true)
	}

	return (
		<>
			<Modal open={openBgModal} onClose={() => setOpenBgModal(false)}>
				<BackgroundTheme />
			</Modal>
			<Modal open={openStarModal} onClose={() => setOpenStartModal(false)}>
				<StarMessages />
			</Modal>

			<LightTooltip title='Menu' placement='bottom'>
				<IconButton
					aria-controls='simple-menu'
					aria-haspopup='true'
					onClick={handleClick}>
					<MoreVert />
				</IconButton>
			</LightTooltip>

			<Menu
				id='simple-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<MenuItem onClick={handleModalClick} name='background'>
					Background
				</MenuItem>
				<MenuItem onClick={handleStarMessageClick}>Star messages</MenuItem>
				<MenuItem onClick={() => logout()}>Logout</MenuItem>
			</Menu>
		</>
	)
}

export default HeaderOptions
