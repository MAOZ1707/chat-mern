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

import './Chat.css'
import Message from './Message'
import {useAuth} from '../../context/authContext'

import io from 'socket.io-client'
import Conversation from './Conversation'

let socket

const Chat = () => {
	const [message, setMessage] = useState({name: '', text: '', room: ''})
	const [messageList, setMessageList] = useState([])
	const {selectedRoom} = useRooms()
	const {loggedUser} = useAuth()
	const [chatUsers, setChatUsers] = useState([])
	const [oldRoom, setOldRoom] = useState('')

	const ENDPOINT = 'http://localhost:5000'

	useEffect(() => {
		socket = io(ENDPOINT)
	}, [ENDPOINT])

	useEffect(() => {
		socket.emit('updateUsers')
	}, [])

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
		socket.on('newMessage', (newMessage) => {
			setMessageList([
				...messageList,
				{name: newMessage.name, text: newMessage.text},
			])
		})

		socket.on('userList', (userList) => {
			setChatUsers(userList)
			setMessage({name: socket.id, text: message.text})
		})
	}, [message.text, messageList])

	const handleChange = (e) => {
		setMessage({...message, text: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const newMessage = {
			name: message.name,
			text: message.text,
			room: selectedRoom.title,
		}
		socket.emit('newMessage', newMessage)
		setMessage({name: socket.id, text: ''})
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
					<div className='chat__body'>
						{messageList.map((msg, i) => (
							<React.Fragment key={i}>
								<Message content={msg} send={loggedUser.name} />
							</React.Fragment>
						))}

						<p className='chat__message chat__receiver'>
							<span className='chat__name'>Maoz</span>
							This is a message
							<span className='chat__timestamp'>
								{new Date().toUTCString()}
							</span>
						</p>
					</div>

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
