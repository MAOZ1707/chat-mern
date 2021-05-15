import React from 'react'
import moment from 'moment'

import './Chat.css'

const Message = ({ content, send }) => {
	return (
		<p className={`chat__message ${content.name !== send ? 'chat__receiver' : null} `}>
			<span className='chat__name'>{content.name}</span>
			{content && content.text}
			<span className='chat__timestamp'>
				{(content && content.time) || moment(content.time).format('HH:mm a')}
			</span>
		</p>
	)
}

export default Message
