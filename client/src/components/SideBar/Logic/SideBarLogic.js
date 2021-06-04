import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../../context/authContext'
import { useMessage } from '../../../context/messageContext'
import { useRooms } from '../../../context/roomsContext'
import { useSocket } from '../../../context/socketContext'
import { useHttp } from '../../../hooks/useHttp'

const SideBarLogic = (room) => {
	const { socket } = useSocket()
	const { userId } = useAuth()
	const { selectedRoom, setSelectedRoom, setRooms } = useRooms()
	const { getRoomMessages, lastMessage } = useMessage()
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
				const getData = await sendRequest(
					`http://localhost:5000/messages/room/${roomId}`,
					'GET',
					{
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						// Authorization: 'Bearer ' + token,
					}
				)

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
			{
				admin: userId,
			}
		)
		const { userRooms } = response.data
		if (response.status === 200) {
			setRooms(userRooms)
		}
	}
	return {
		deleteRoom,
		roomInfo,
		roomLastMsg,
		setRoomLastMsg,
		prevRoom,
		setPrevRoom,
	}
}

export default SideBarLogic
