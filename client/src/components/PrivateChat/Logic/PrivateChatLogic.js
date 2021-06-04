import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/authContext'
import { useSocket } from '../../../context/socketContext'
import moment from 'moment'

const PrivateChatLogic = (friend) => {
	const { username } = useAuth()
	const { socket } = useSocket()
	const [messageList, setMessageList] = useState([])
	const [message, setMessage] = useState({ name: username, text: '' })

	const handleChange = (e) => {
		setMessage({ ...message, text: e.target.value })
	}

	const sendMessage = (e) => {
		e.preventDefault()
		let format = moment().format('HH:mm a')
		const newMessage = {
			name: message.name,
			text: message.text,
			time: format,
			to: friend,
			private: true,
		}
		socket.emit('sendMessage', newMessage)
		setMessage({ name: message.name, text: '' })
	}
	useEffect(() => {
		socket.on('sendMessage', (newMessage) => {
			setMessageList((prev) => [...prev, newMessage])
		})
	}, [])

	return {
		sendMessage,
		handleChange,
		messageList,
		setMessageList,
		message,
		setMessage,
	}
}

export default PrivateChatLogic
