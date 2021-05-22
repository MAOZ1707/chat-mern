import moment from 'moment'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import { useAuth } from '../../../context/authContext'
import { useMessage } from '../../../context/messageContext'
import { useRooms } from '../../../context/roomsContext'

let socket
const ChatLogic2 = () => {
	const { selectedRoom } = useRooms()
	const { username } = useAuth()
	const { saveMessage, conversationMsgs, setLastMessage } = useMessage()
	const [message, setMessage] = useState({ name: '', text: '', room: '' })
	// const [messageList, setMessageList] = useState(conversationMsgs || [])
	// const [chatUsers, setChatUsers] = useState([])
	// const [oldRoom, setOldRoom] = useState('')

	const ENDPOINT = 'http://localhost:8000'

	socket = io(ENDPOINT)

	socket.on('message', (msg) => {
		console.log(msg)
	})

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
		socket.emit('chatMessage', newMessage)
		setMessage({ name: username, text: '' })
		setLastMessage({ roomId: selectedRoom._id, text: message.text })
		saveMessage(newMessage)
	}

	return {
		message,
		handleChange,
		handleSubmit,
	}
}

export default ChatLogic2
