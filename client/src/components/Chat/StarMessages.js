import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { useHttp } from '../../hooks/useHttp'

import './StarMessage.css'

const StarMessages = () => {
	const { sendRequest } = useHttp()
	const { userId, token } = useAuth()
	const [messages, setMessages] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/messages/user/${userId}/favorite`,
				'GET',
				null,
				{
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: 'Bearer ' + token,
				}
			)
			if (response.statusText === 'OK') {
				setMessages(response.data.message)
			}
		}
		fetchData()
	}, [userId])

	return (
		<div className='star-msg__container'>
			{messages &&
				messages.map((message) => (
					<div className='star-msg__content' key={message.text}>
						<h4 className='star-msg__room'>Room: {message.room}</h4>
						<h6 className='star-msg__text'>{message.text}</h6>
					</div>
				))}
		</div>
	)
}

export default StarMessages
