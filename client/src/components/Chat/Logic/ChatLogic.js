import moment from 'moment'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import { useAuth } from '../../../context/authContext'
import { useMessage } from '../../../context/messageContext'
import { useRooms } from '../../../context/roomsContext'

let socket
const ChatLogic = () => {
	const { selectedRoom } = useRooms()
	const { username } = useAuth()
	const { saveMessage, conversationMsgs, setLastMessage } = useMessage()
	const [message, setMessage] = useState({ name: '', text: '', room: '' })
	const [messageList, setMessageList] = useState(conversationMsgs || [])
	const [chatUsers, setChatUsers] = useState([])
	const [oldRoom, setOldRoom] = useState('')

	const ENDPOINT = 'http://localhost:8000'

	useEffect(() => {
		socket = io(ENDPOINT)

		return () => {
			socket.disconnect()
		}
	}, [ENDPOINT])

	useEffect(() => {
		if (conversationMsgs) {
			setMessageList(conversationMsgs)
		}
	}, [conversationMsgs, selectedRoom])

	useEffect(() => {
		socket.emit('userJoin', username)
	}, [username])

	useEffect(() => {
		if (selectedRoom) {
			socket.emit('roomEntered', {
				leaveRoom: oldRoom,
				newRoom: selectedRoom.title,
			})
			setMessageList([])
		}

		return () => {
			if (selectedRoom) {
				setOldRoom(selectedRoom.title)
			}
		}
	}, [selectedRoom, oldRoom])

	useEffect(() => {
		socket.once('newMessage', (newMessage) => {
			setMessageList([...messageList, { name: newMessage.name, text: newMessage.text }])
		})

		if (username) {
			socket.on('userList', (userList) => {
				setChatUsers(userList)
				setMessage({ name: username, text: message.text })
			})
		}
	}, [message.text, messageList, username])

	const handleChange = (e) => {
		setMessage({ ...message, text: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		let format = moment(new Date()).format('HH:mm a')

		const newMessage = {
			name: message.name,
			text: message.text,
			room: selectedRoom.title,
			time: format,
			roomId: selectedRoom._id,
		}
		socket.emit('newMessage', newMessage)
		setMessage({ name: username, text: '' })
		setLastMessage({ roomId: selectedRoom._id, text: message.text })
		saveMessage(newMessage)
	}

	return { message, messageList, oldRoom, handleChange, handleSubmit }
}

export default ChatLogic
