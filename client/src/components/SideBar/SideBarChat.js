import React from 'react'
import { Avatar } from '@material-ui/core'
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded'
import SideBarLogic from './Logic/SideBarLogic'
import { useRooms } from '../../context/roomsContext'

import './SideBarChat.css'
import { useAuth } from '../../context/authContext'

const SideBarChat = ({ room }) => {
	const { selectedRoom } = useRooms()
	const { userId } = useAuth()
	const { deleteRoom, roomInfo, roomLastMsg } = SideBarLogic(room)

	return (
		<div className='sidebarChat' onClick={roomInfo}>
			<Avatar />
			<div className='sidebarChat__info'>
				<h2>{room.title}</h2>
				<p>{roomLastMsg}</p>
			</div>
			{selectedRoom && selectedRoom.admin === userId ? (
				<div
					className='sidebarChat__delete'
					onClick={() => deleteRoom(selectedRoom._id)}>
					<HighlightOffRoundedIcon />
				</div>
			) : null}
		</div>
	)
}

export default SideBarChat
