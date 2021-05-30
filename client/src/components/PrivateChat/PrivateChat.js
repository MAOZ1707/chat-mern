import { IconButton } from '@material-ui/core'
import { SendOutlined } from '@material-ui/icons'
import SecurityIcon from '@material-ui/icons/Security'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { useSocket } from '../../context/socketContext'

import './PrivateChat.css'

const PrivateChat = ({ friend }) => {
	const { username } = useAuth()
	const { socket } = useSocket()
	const [messageList, setMessageList] = useState([])
	const [message, setMessage] = useState({ name: username, text: '' })
	console.log(friend)
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

	return (
		<div className='private-chat__container'>
			<div className='private_chat__note-wrapper'>
				<SecurityIcon />
				<p className='private-chat__note'>
					You are in private chat, <br />
					the messages will delete after closing the chat
				</p>
			</div>

			<div className='private-chat__messages'>
				{messageList &&
					messageList.map((msg) => (
						<div
							className={`private-chat__message_wrapper ${
								friend === msg.name ? 'receiver' : null
							}`}>
							<h3 className='private-chat__name'>{msg.name}</h3>
							<p className='private-chat__body'>{msg.text}</p>
						</div>
					))}
			</div>
			<div className='private-chat__footer'>
				<form onSubmit={sendMessage}>
					<input
						type='text'
						placeholder='Type a message'
						onChange={handleChange}
						value={message.text}
					/>
					<button type='submit' onSubmit={sendMessage}>
						<IconButton>
							<SendOutlined />
						</IconButton>
					</button>
				</form>
			</div>
		</div>
	)
}

export default PrivateChat
