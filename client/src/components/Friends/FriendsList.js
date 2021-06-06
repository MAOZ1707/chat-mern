import React from 'react'

import { useUsers } from '../../context/userContext'
import { useRooms } from '../../context/roomsContext'

import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined'
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined'
import { Avatar, Tooltip, withStyles } from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import './FriendList.css'
import { useSocket } from '../../context/socketContext'
import Modal from '../../UiElements/Modal/Modal'
import PrivateChat from '../PrivateChat/PrivateChat'
import FriendsLogics from './Logic/FriendsLogics'

import { LightTooltip } from '../../utils/materialUI/style'

const FriendsList = ({ option, search }) => {
	const { rooms } = useRooms()
	const { userFriends } = useUsers()
	const { chatUsers } = useSocket()
	const {
		anchorEl,
		handleClick,
		handleClose,
		inviteToRoom,
		openPrivateMessage,
		removeFriend,
		selectedFriend,
		sendPrivateMessage,
		setOpenPrivateMessage,
	} = FriendsLogics()

	let searchFriends
	if (option === 'friends-list') {
		searchFriends = userFriends.filter((friend) =>
			friend.name.toLowerCase().includes(search.toLowerCase())
		)
	}

	console.log(searchFriends)

	return (
		<div className='friend-list__container'>
			<Modal
				onClose={() => setOpenPrivateMessage(false)}
				open={openPrivateMessage}>
				<PrivateChat friend={selectedFriend} />
			</Modal>

			<h2 className='friend-list__title'>My Friends</h2>
			{searchFriends &&
				searchFriends.map((friend, i) => (
					<div className='friend-list_view' key={i}>
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
							<span
								aria-controls='simple-menu'
								aria-haspopup='true'
								className='friend-list-option'>
								<LightTooltip title='Invite to room' placement='bottom'>
									<GroupAddIcon
										className='group_icon'
										onClick={(event) => handleClick(event, friend)}
									/>
								</LightTooltip>

								<LightTooltip title='Private message' placement='bottom'>
									<MessageOutlinedIcon
										className='msg_icon'
										onClick={() => sendPrivateMessage(friend.name)}
									/>
								</LightTooltip>
								<LightTooltip title='Remove' placement='bottom'>
									<HighlightOffOutlinedIcon
										className='delete_icon'
										onClick={() => removeFriend(friend.email)}
									/>
								</LightTooltip>
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
										onClick={() => inviteToRoom(room._id, selectedFriend)}>
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
