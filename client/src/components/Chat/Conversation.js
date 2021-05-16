import React from 'react'
import Message from './Message'
import ScrollToBottom from 'react-scroll-to-bottom'

import './Chat.css'

const Conversation = ({ messageList, send }) => {
	return (
		<ScrollToBottom className='messages'>
			<div className='chat__body'>
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
