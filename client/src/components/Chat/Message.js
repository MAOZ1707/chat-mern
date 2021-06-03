import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'

import { useHttp } from '../../hooks/useHttp'

import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import StarIcon from '@material-ui/icons/Star'

import './Chat.css'

const Message = ({ content, send }) => {
	const { error, isLoading, sendRequest } = useHttp()
	const [starMessage, setStarMessage] = useState(content.favorite)

	const handleClick = async () => {
		const response = await sendRequest(
			`http://localhost:5000/messages/${content._id}/favorite`,
			'POST',
			{ favorite: !starMessage }
		)
		const { message } = response.data
		console.log(response.data)
		if (response.statusText === 'OK') {
			setStarMessage(message.favorite)
		}
	}

	return (
		<p
			className={`chat__message ${
				content.name !== send ? 'chat__receiver' : null
			} `}>
			<span className='chat__favorite' onClick={handleClick}>
				{starMessage ? <StarIcon /> : <StarBorderOutlinedIcon />}
			</span>
			<span className='chat__name'>{content.name}</span>
			{content && content.text}
			<span className='chat__timestamp'>
				{(content && content.time) || moment(content.time).format('HH:mm a')}
			</span>
		</p>
	)
}

export default Message
