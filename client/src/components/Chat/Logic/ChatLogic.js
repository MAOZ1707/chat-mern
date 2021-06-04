import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/authContext'
import { useMessage } from '../../../context/messageContext'
import { useRooms } from '../../../context/roomsContext'
import { useSocket } from '../../../context/socketContext'
import moment from 'moment'

const ChatLogic = (socket) => {
	const { selectedRoom } = useRooms()
	const { username } = useAuth()
	const { chatUsers, setChatUsers } = useSocket()
	const { saveMessage, conversationMsgs, setLastMessage } = useMessage()

	const [message, setMessage] = useState({ name: username, text: '', room: '' })
	const [messages, setMessages] = useState(conversationMsgs || [])

	const [searchTerm, setSearchTerm] = useState('')
	const [openEmoji, setOpenEmoji] = useState(false)

	useEffect(() => {
		socket.emit('userJoin', username)
	}, [])

	useEffect(() => {
		if (conversationMsgs) setMessages(conversationMsgs)
	}, [conversationMsgs, selectedRoom])

	useEffect(() => {
		socket.on('sendMessage', (newMessage) => {
			setMessages((prev) => [...prev, newMessage])
		})
	}, [])

	useEffect(() => {
		socket.on('userList', (userList) => {
			setChatUsers(userList)
		})
	}, [chatUsers])

	const sendMessage = (e) => {
		e.preventDefault()
		let format = moment().format('HH:mm a')
		const newMessage = {
			name: message.name,
			text: message.text,
			room: selectedRoom.title,
			time: format,
			roomId: selectedRoom._id,
		}
		socket.emit('sendMessage', newMessage)
		setMessage({ name: message.name, text: '', room: '' })
		setLastMessage({ roomId: selectedRoom._id, text: message.text })
		saveMessage(newMessage)
		setOpenEmoji(false)
	}

	const handleChange = (e) => {
		setMessage({ ...message, text: e.target.value })
	}
	const onEmojiClick = (event, emojiObject) => {
		setMessage({ ...message, text: message.text + emojiObject.emoji })
	}

	return {
		handleChange,
		onEmojiClick,
		sendMessage,
		message,
		messages,
		searchTerm,
		setSearchTerm,
		openEmoji,
		setOpenEmoji,
	}
}

export default ChatLogic
