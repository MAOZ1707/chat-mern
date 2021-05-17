import React from 'react'
import Message from './Message'
import ScrollToBottom from 'react-scroll-to-bottom'

import './Chat.css'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const Conversation = ({ messageList, send }) => {
	const { value } = useLocalStorage('Theme')

	return (
		<ScrollToBottom className='messages'>
			<div className='chat__body' style={{ backgroundImage: `url(${value})` }}>
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
