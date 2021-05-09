import React from 'react'
import Message from './Message'

import './Chat.css'

const Conversation = ({messageList, send}) => {
	return (
		<div className='chat__body'>
			{messageList &&
				messageList.map((msg, i) => (
					<React.Fragment key={i}>
						<Message content={msg} send={send} />
					</React.Fragment>
				))}
		</div>
	)
}

export default Conversation
