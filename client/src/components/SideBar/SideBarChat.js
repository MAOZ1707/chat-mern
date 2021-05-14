import React, { useEffect } from 'react'
import { Avatar } from '@material-ui/core'

import { useRooms } from '../../context/roomsContext'
import { useMessage } from '../../context/messageContext'

import './SideBarChat.css'

const SideBarChat = ({ room }) => {
	const { chooseRoom, selectedRoom } = useRooms()
	const { getRoomMessages } = useMessage()

	const roomInfo = () => {
		chooseRoom(room._id)
	}

	useEffect(() => {
		if (selectedRoom !== null) {
			getRoomMessages(selectedRoom._id)
		}
	}, [getRoomMessages, selectedRoom])

	return (
		<div className='sidebarChat' onClick={roomInfo}>
			<Avatar />
			<div className='sidebarChat__info'>
				<h2>{room.title}</h2>
				<p>This is the last message</p>
			</div>
		</div>
	)
}

export default SideBarChat
