import React, {useEffect, useState} from 'react'

import {useRooms} from '../../context/roomsContext'

import {Avatar, IconButton} from '@material-ui/core'
import {
	AttachFile,
	InsertEmoticon,
	MoreVert,
	SearchOutlined,
	SendOutlined,
} from '@material-ui/icons'

import {useAuth} from '../../context/authContext'

import io from 'socket.io-client'
import Conversation from './Conversation'
import {useMessage} from '../../context/messageContext'

import './Chat.css'
import moment from 'moment'

let socket

const Chat = () => {
	const {selectedRoom} = useRooms()
	const {username} = useAuth()
	const {saveMessage, conversationMsgs} = useMessage()
	const [message, setMessage] = useState({name: '', text: '', room: ''})
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
			setMessageList([
				...messageList,
				{name: newMessage.name, text: newMessage.text},
			])
		})

		if (username) {
			socket.on('userList', (userList) => {
				setChatUsers(userList)
				setMessage({name: username, text: message.text})
			})
		}
	}, [message.text, messageList, username])

	const handleChange = (e) => {
		setMessage({...message, text: e.target.value})
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
		setMessage({name: username, text: ''})

		saveMessage(newMessage)
	}

	return (
		<div className='chat'>
			<div className='chat__header'>
				<Avatar />

				<div className='chat__headerInfo'>
					<h3>{selectedRoom && selectedRoom.title}</h3>
					<p>last seeing .....</p>
				</div>

				<div className='chat__headerRight'>
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>

			{selectedRoom && (
				<>
					<Conversation
						room={selectedRoom}
						messageList={messageList}
						send={username}
					/>

					<div className='chat__footer'>
						<InsertEmoticon />
						<form onSubmit={handleSubmit}>
							<input
								type='text'
								placeholder='Type a message'
								onChange={handleChange}
								value={message.text}
							/>
							<button type='submit' onSubmit={handleSubmit}>
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
