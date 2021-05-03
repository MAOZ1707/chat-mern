import React from 'react'

import './Chat.css'

const Message = ({text}) => {
	return (
		<p className='chat__message'>
			<span className='chat__name'>Maoz</span>
			{text}
			<span className='chat__timestamp'>{new Date().toUTCString()}</span>
		</p>
	)
}

export default Message
