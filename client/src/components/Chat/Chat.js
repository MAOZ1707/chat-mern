import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Picker from 'emoji-picker-react'

import { useAuth } from '../../context/authContext'
import { useRooms } from '../../context/roomsContext'
import { useMessage } from '../../context/messageContext'
import Conversation from './Conversation'

import { Avatar, IconButton } from '@material-ui/core'
import { InsertEmoticon, SendOutlined } from '@material-ui/icons'

import HeaderOptions from './HeaderOptions'
import HeaderFiles from './HeaderFiles'
import HeaderSearch from './HeaderSearch'

import './Chat.css'

const Chat = ({ socket }) => {
	const { selectedRoom } = useRooms()
	const { username } = useAuth()
	const { saveMessage, conversationMsgs, setLastMessage } = useMessage()

	const [message, setMessage] = useState({ name: username, text: '', room: '' })
	const [messages, setMessages] = useState(conversationMsgs || [])
	const [chatUsers, setChatUsers] = useState([])

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
	}

	const handleChange = (e) => {
		setMessage({ ...message, text: e.target.value })
	}
	const onEmojiClick = (event, emojiObject) => {
		console.log(emojiObject)
		setMessage({ ...message, text: message.text + emojiObject.emoji })
	}
	return (
		<div className='chat'>
			{selectedRoom && (
				<div className='chat__header'>
					<Avatar />
					<div className='chat__headerInfo'>
						<h3>{selectedRoom && selectedRoom.title}</h3>
						{chatUsers}
					</div>

					<div className='chat__headerRight'>
						<HeaderSearch
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
						/>
						<HeaderFiles />
						<HeaderOptions />
					</div>
				</div>
			)}
			{selectedRoom && (
				<>
					<Conversation
						search={searchTerm}
						room={selectedRoom}
						messageList={messages}
						send={username}
					/>

					<div className='chat__footer'>
						<InsertEmoticon
							onClick={() => setOpenEmoji((prev) => !prev)}
							style={{ cursor: 'pointer' }}
						/>
						{openEmoji && (
							<Picker
								onEmojiClick={onEmojiClick}
								pickerStyle={{
									position: 'absolute',
									bottom: '55px',
									left: 0,
								}}
							/>
						)}
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
				</>
			)}
		</div>
	)
}

export default Chat
