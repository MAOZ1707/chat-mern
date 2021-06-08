import React, { useState } from 'react'
import moment from 'moment'

import { useHttp } from '../../hooks/useHttp'
import { useAuth } from '../../context/authContext'

import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import StarIcon from '@material-ui/icons/Star'

import './Chat.css'

const Message = ({ content, send }) => {
	const { sendRequest } = useHttp()
	const { token } = useAuth()
	const [starMessage, setStarMessage] = useState(content.favorite)

	const handleClick = async () => {
		const response = await sendRequest(
			`${process.env.REACT_APP_BACKEND_URL}/messages/${content._id}/favorite`,
			'PUT',
			{ favorite: !starMessage },
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				Authorization: 'Bearer ' + token,
			}
		)
		const { message } = response.data
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
