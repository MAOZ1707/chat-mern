import React, { useState, Suspense } from 'react'

import { useRooms } from '../../context/roomsContext'
import { AddOutlined, SupervisorAccount } from '@material-ui/icons'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core'
import { LightTooltip, useStyles } from '../../utils/materialUI/style'
import Loader from '../../UiElements/Loader/Loader'

import './SideBar.css'

const Rooms = React.lazy(() => import('../Rooms/Rooms'))
const CreateRoom = React.lazy(() => import('../Rooms/CreateRoom'))
const Friends = React.lazy(() => import('../Friends/Friends'))
const FriendsList = React.lazy(() => import('../Friends/FriendsList'))

const SideBar = ({ socket, username }) => {
	const [options, setOptions] = useState('')
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [searchTerm, setSearchTerm] = useState('')

	const { rooms } = useRooms()
	const classes = useStyles()

	const getUserCharacters = username.slice(0, 2).toUpperCase()

	let localRoute

	switch (options) {
		case 'create-room':
			localRoute = <CreateRoom redirect={setOptions} />
			break
		case 'rooms':
			localRoute = <Rooms rooms={rooms} option={options} search={searchTerm} />
			break
		case 'add-friends':
			localRoute = <Friends redirect={setOptions} />
			break
		case 'friends-list':
			localRoute = (
				<FriendsList
					redirect={setOptions}
					option={options}
					search={searchTerm}
				/>
			)
			break
		default:
			localRoute = <Rooms rooms={rooms} option={options} search={searchTerm} />
			break
	}

	const onSearchChange = (e) => {
		setSearchTerm(e.target.value)
	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<Avatar className={classes.large}>{getUserCharacters}</Avatar>
				<div className='sidebar__headerRight'>
					<LightTooltip title='Friends' placement='top-start'>
						<IconButton onClick={() => setOptions('friends-list')}>
							<SupervisorAccount fontSize='small' />
						</IconButton>
					</LightTooltip>

					<LightTooltip title='Rooms' placement='top-start'>
						<IconButton onClick={() => setOptions('rooms')}>
							<ChatOutlinedIcon fontSize='small' />
						</IconButton>
					</LightTooltip>

					<LightTooltip title='Add' placement='top-start'>
						<IconButton
							aria-controls='simple-menu'
							aria-haspopup='true'
							onClick={handleClick}>
							<AddOutlined />
						</IconButton>
					</LightTooltip>

					<Menu
						id='simple-menu'
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}>
						<MenuItem onClick={handleClose}>
							<p onClick={() => setOptions('create-room')}>Create Room</p>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<p onClick={() => setOptions('add-friends')}>Add Friend</p>
						</MenuItem>
					</Menu>
				</div>
			</div>

			<div className='sidebar__search'>
				<div className='sidebar__searchContainer'>
					<SearchOutlinedIcon />
					<input
						type='text'
						placeholder='Search or start new chat'
						onChange={onSearchChange}
						value={searchTerm}
					/>
				</div>
			</div>

			<div className='sidebar__chat'>
				<Suspense fallback={<Loader />}>{localRoute}</Suspense>
			</div>
		</div>
	)
}

export default SideBar
