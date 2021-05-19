import React from 'react'

import { useAuth } from '../../context/authContext'
import Conversation from './Conversation'
import { useRooms } from '../../context/roomsContext'

import { Avatar, IconButton } from '@material-ui/core'
import { InsertEmoticon, SendOutlined } from '@material-ui/icons'

import ChatLogic from './Logic/ChatLogic'
import HeaderOptions from './HeaderOptions'
import HeaderFiles from './HeaderFiles'
import HeaderSearch from './HeaderSearch'

import './Chat.css'

const Chat = () => {
	const { handleChange, handleSubmit, message, messageList } = ChatLogic()
	const { selectedRoom } = useRooms()
	const { username } = useAuth()

	console.log('Re-renders')

	return (
		<div className='chat'>
			<div className='chat__header'>
				<Avatar />
				<div className='chat__headerInfo'>
					<h3>{selectedRoom && selectedRoom.title}</h3>
				</div>

				<div className='chat__headerRight'>
					<HeaderSearch />
					<HeaderFiles />
					<HeaderOptions />
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
