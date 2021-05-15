import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'

import { useRooms } from '../../context/roomsContext'
import { useMessage } from '../../context/messageContext'
import { useHttp } from '../../hooks/useHttp'

import './SideBarChat.css'
import axios from 'axios'

const SideBarChat = ({ room }) => {
	const { chooseRoom, selectedRoom } = useRooms()
	const { getRoomMessages, conversationMsgs } = useMessage()
	const [lastMsg, setLastMsg] = useState(null)

	const roomInfo = () => {
		chooseRoom(room._id)
	}

	useEffect(() => {
		const response = async () => {
			try {
				const getData = await axios({
					url: `http://localhost:5000/messages/room/${room._id}`,
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						// Authorization: 'Bearer ' + token,
					},
				})

				let { message } = getData.data
				const arrOfMsg = message.map((msg) => msg.text)
				setLastMsg(arrOfMsg[arrOfMsg.length - 1])
			} catch (error) {}
		}
		response()
	}, [room._id, conversationMsgs])

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
				<p>{lastMsg}</p>
			</div>
		</div>
	)
}

export default SideBarChat
