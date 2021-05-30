import React, { useCallback, useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded'

import { useRooms } from '../../context/roomsContext'
import { useMessage } from '../../context/messageContext'

import axios from 'axios'
import { useSocket } from '../../context/socketContext'

import './SideBarChat.css'
import { useAuth } from '../../context/authContext'
import { useHttp } from '../../hooks/useHttp'

const SideBarChat = ({ room }) => {
	const { socket } = useSocket()
	const { selectedRoom, setSelectedRoom, setRooms } = useRooms()
	const { getRoomMessages, lastMessage } = useMessage()
	const { userId } = useAuth()
	const [roomLastMsg, setRoomLastMsg] = useState()
	const [prevRoom, setPrevRoom] = useState('')

	const { sendRequest } = useHttp()

	const roomInfo = useCallback(() => {
		if (socket) {
			setSelectedRoom(room)
			socket.emit('roomEntered', { oldRoom: prevRoom, newRoom: room })
		}
	}, [prevRoom, room, setSelectedRoom, socket])

	useEffect(() => {
		setPrevRoom(selectedRoom)
	}, [selectedRoom])

	useEffect(() => {
		const getLastRoomMessage = async (roomId) => {
			try {
				const getData = await axios({
					url: `/messages/room/${roomId}`,
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						// Authorization: 'Bearer ' + token,
					},
				})

				let { message } = getData.data
				const arrOfMsg = message.map((msg) => msg.text)
				setRoomLastMsg(arrOfMsg[arrOfMsg.length - 1])
			} catch (error) {}
		}
		getLastRoomMessage(room._id)
	}, [room._id])

	useEffect(() => {
		if (lastMessage && lastMessage.roomId === room._id) {
			setRoomLastMsg(lastMessage.text)
		}
	}, [lastMessage, room._id])

	useEffect(() => {
		if (selectedRoom !== null) {
			getRoomMessages(selectedRoom._id)
		}
	}, [getRoomMessages, selectedRoom])

	const deleteRoom = async (roomId) => {
		const response = await sendRequest(
			`http://localhost:5000/rooms/${roomId}/delete`,
			'DELETE',
			{ admin: userId }
		)
		const { userRooms } = response.data
		if (response.status === 200) {
			setRooms(userRooms)
		}
	}

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
