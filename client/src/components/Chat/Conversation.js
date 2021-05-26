import React from 'react'
import Message from './Message'
import ScrollToBottom from 'react-scroll-to-bottom'

import { useTheme } from '../../context/themeContext'

import './Chat.css'

const Conversation = ({ messageList, send, search }) => {
	const { selectTheme } = useTheme()

	let filterMessages = messageList.filter((msg) => msg.text.includes(search))
	console.log(filterMessages)

	return (
		<ScrollToBottom className='messages'>
			<div
				className='chat__body'
				style={{ backgroundImage: `url(${selectTheme})` }}>
				{messageList &&
					filterMessages.map((msg, i) => (
						<React.Fragment key={i}>
							<Message content={msg} send={send} />
						</React.Fragment>
					))}
			</div>
		</ScrollToBottom>
	)
}

export default Conversation
