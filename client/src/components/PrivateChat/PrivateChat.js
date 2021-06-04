import { IconButton } from '@material-ui/core'
import { SendOutlined } from '@material-ui/icons'
import SecurityIcon from '@material-ui/icons/Security'
import React from 'react'
import PrivateChatLogic from './Logic/PrivateChatLogic'

import './PrivateChat.css'

const PrivateChat = ({ friend }) => {
	const { handleChange, message, messageList, sendMessage } =
		PrivateChatLogic(friend)

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
							key={msg.name}
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
