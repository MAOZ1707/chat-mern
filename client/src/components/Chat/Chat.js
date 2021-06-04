import React from 'react'
import Picker from 'emoji-picker-react'

import { useAuth } from '../../context/authContext'
import { useRooms } from '../../context/roomsContext'
import Conversation from './Conversation'
import ChatLogic from './Logic/ChatLogic'

import { InsertEmoticon, SendOutlined } from '@material-ui/icons'
import { Avatar, IconButton } from '@material-ui/core'
import HeaderOptions from './HeaderOptions'
import HeaderFiles from './HeaderFiles'
import HeaderSearch from './HeaderSearch'

import './Chat.css'
import Loader from '../../UiElements/Loader/Loader'

const Chat = ({ socket }) => {
	const { selectedRoom, roomUsers } = useRooms()
	const { username } = useAuth()
	const {
		handleChange,
		message,
		messages,
		onEmojiClick,
		openEmoji,
		searchTerm,
		sendMessage,
		setOpenEmoji,
		setSearchTerm,
	} = ChatLogic(socket)

	return (
		<div className='chat'>
			{selectedRoom ? (
				<>
					<div className='chat__header'>
						<Avatar />
						<div className='chat__headerInfo'>
							<h3>{selectedRoom && selectedRoom.title}</h3>
							<div className='chat__room-users'>
								{roomUsers &&
									roomUsers.map((user) => (
										<p className='chat__room-user' key={user}>
											{user}
										</p>
									))}
							</div>
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
				</>
			) : (
				<>
					<Loader />
				</>
			)}
		</div>
	)
}

export default Chat
