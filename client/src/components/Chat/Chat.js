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
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])
	const {selectedRoom} = useRooms()
	const {loggedUser} = useAuth()

	console.log(selectedRoom)

	const handleSubmit = (e) => {
		e.preventDefault()
		if (message) {
			let x = {
				room: selectedRoom.title,
				sender: loggedUser.name,
				text: message,
			}
			socket.emit('sendMessage', x)
		}
		setMessage('')
	}

	useEffect(() => {
		socket = io('http://localhost:5000')
	}, [])

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages([...messages, message])
		})
	}, [messages])

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
						{messages.map((msg, i) => (
							<React.Fragment key={i}>
								<Message content={msg} />
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
								onChange={(e) => setMessage(e.target.value)}
								value={message}
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
