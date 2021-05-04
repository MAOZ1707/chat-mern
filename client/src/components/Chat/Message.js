import React from 'react'
import moment from 'moment'

import './Chat.css'

const Message = ({content}) => {
	return (
		<p className='chat__message'>
			<span className='chat__name'>Maoz</span>
			{content && content.text}
			<span className='chat__timestamp'>
				{content && moment(content.time).format('HH:mm a')}
			</span>
		</p>
	)
}

export default Message
