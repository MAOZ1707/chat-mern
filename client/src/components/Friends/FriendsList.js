import React, { useEffect } from 'react'

import { useUsers } from '../../context/userContext'
import { useAuth } from '../../context/authContext'
import { useRooms } from '../../context/roomsContext'
import { Avatar } from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import './FriendList.css'

const FriendsList = () => {
	const { userFriends, loadUserFriends } = useUsers()
	const { userId } = useAuth()
	const { rooms } = useRooms()

	console.log(rooms)

	useEffect(() => {
		loadUserFriends(userId)
	}, [userId])

	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div className='friend-list__container'>
			<h2 className='friend-list__title'>My Friends</h2>
			{userFriends &&
				userFriends.map((friend, i) => (
					<div className='friend-list_view' key={i}>
						<div className='avatar'>
							<Avatar>PIC</Avatar>
						</div>
						<div className='friend-list_view__info'>
							<h2 className='friend-list_name'>{friend.name}</h2>
							<span aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
								<GroupAddIcon className='group_icon' />
							</span>
						</div>
						<Menu
							id='simple-menu'
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}>
							{rooms &&
								rooms.map((room) => (
									<MenuItem key={room._id} onClick={handleClose}>
										{room.title}
									</MenuItem>
								))}
						</Menu>
					</div>
				))}
		</div>
	)
}

export default FriendsList
