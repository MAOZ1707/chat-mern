import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { useHttp } from '../../hooks/useHttp'

import './StarMessage.css'

const StarMessages = () => {
	const { sendRequest } = useHttp()
	const { userId } = useAuth()
	const [messages, setMessages] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const response = await sendRequest(
				`/messages/user/${userId}/favorite`,
				'Get'
			)
			if (response.status === 200) {
				setMessages(response.data.message)
			}
		}
		fetchData()
	}, [userId])

	console.log(messages)

	return (
		<div className='star-msg__container'>
			{messages &&
				messages.map((message) => (
					<div className='star-msg__content'>
						<h4 className='star-msg__room'>Room: {message.name}</h4>
						<h6 className='star-msg__text'>{message.text}</h6>
					</div>
				))}
		</div>
	)
}

export default StarMessages
