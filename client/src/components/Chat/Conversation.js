import React from 'react'
import Message from './Message'
import ScrollToBottom from 'react-scroll-to-bottom'

import { useTheme } from '../../context/themeContext'

import './Chat.css'

const Conversation = ({ messageList, send }) => {
	const { selectTheme } = useTheme()

	return (
		<ScrollToBottom className='messages'>
			<div
				className='chat__body'
				style={{ backgroundImage: `url(${selectTheme})`, height: 'auto' }}>
				{messageList &&
					messageList.map((msg, i) => (
						<React.Fragment key={i}>
							<Message content={msg} send={send} />
						</React.Fragment>
					))}
			</div>
		</ScrollToBottom>
	)
}

export default Conversation
