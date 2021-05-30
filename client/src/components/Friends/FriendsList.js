import React, { useEffect, useState } from 'react'

import { useUsers } from '../../context/userContext'
import { useAuth } from '../../context/authContext'
import { useRooms } from '../../context/roomsContext'
import { useHttp } from '../../hooks/useHttp'

import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined'
import { Avatar } from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import './FriendList.css'
import { useSocket } from '../../context/socketContext'
import Modal from '../../UiElements/Modal/Modal'
import PrivateChat from '../PrivateChat/PrivateChat'

const FriendsList = () => {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const { setUserFriends, userFriends, loadUserFriends } = useUsers()
	const { userId } = useAuth()
	const { rooms } = useRooms()
	const { sendRequest } = useHttp()
	const { chatUsers, socket } = useSocket()
	const [load, setLoad] = useState(false)
	const [openPrivateMessage, setOpenPrivateMessage] = useState(false)
	const [selectedFriend, setSelectedFriend] = useState('')

	useEffect(() => {
		loadUserFriends(userId)
	}, [loadUserFriends, userId])

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const inviteToRoom = async (roomId, email) => {
		try {
			const response = await sendRequest(
				`/rooms/${roomId}/addUser`,
				'patch',
				{
					email: email,
					admin: userId,
				},
				{
					'Content-Type': 'application/json',
					// Authorization: 'Bearer ' + token,
				}
			)
			if (response.statusText === 'OK') {
				setAnchorEl(null)
			}
		} catch (error) {}
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	const removeFriend = async (friendEmail) => {
		try {
			const response = await sendRequest(
				`/users/remove-friend`,
				'patch',
				{
					admin: userId,
					friendEmail,
				},
				{
					'Content-Type': 'application/json',
					// Authorization: 'Bearer ' + token,
				}
			)
			const { updateUser } = response.data

			if (response.statusText === 'OK') {
				setUserFriends(updateUser.friends)
				setLoad((prev) => !prev)
			}
		} catch (error) {}
	}

	const sendPrivateMessage = (friend) => {
		if (socket) {
			socket.emit('privateMessage', friend)
			setSelectedFriend(friend)
			setOpenPrivateMessage(true)
		}
	}

	return (
		<div className='friend-list__container'>
			<Modal
				onClose={() => setOpenPrivateMessage(false)}
				open={openPrivateMessage}>
				<PrivateChat friend={selectedFriend} />
			</Modal>

			<h2 className='friend-list__title'>My Friends</h2>
			{userFriends &&
				userFriends.map((friend, i) => (
					<div
						className='friend-list_view'
						key={i}
						onClick={() => sendPrivateMessage(friend.name)}>
						<div className='avatar'>
							<Avatar>PIC</Avatar>
							{chatUsers &&
							chatUsers.some(
								(user) => friend.name.toLowerCase() === user.toLowerCase()
							) ? (
								<div className='friend-list_online'></div>
							) : null}
						</div>
						<div className='friend-list_view__info'>
							<h2 className='friend-list_name'>{friend.name}</h2>
							<span aria-controls='simple-menu' aria-haspopup='true'>
								<GroupAddIcon className='group_icon' onClick={handleClick} />
								<HighlightOffOutlinedIcon
									className='delete_icon'
									onClick={() => removeFriend(friend.email)}
								/>
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
									<MenuItem
										key={room._id}
										onClick={() => inviteToRoom(room._id, friend.email)}>
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
