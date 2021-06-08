import React, { useCallback, useContext, useState } from 'react'

import { useHttp } from '../hooks/useHttp'
import { useAuth } from './authContext'

const MessageContext = React.createContext()

export function useMessage() {
	return useContext(MessageContext)
}

export function MessageProvider({ children }) {
	const [conversationMsgs, setConversationMsgs] = useState(null)
	const [lastMessage, setLastMessage] = useState()
	const { sendRequest } = useHttp()
	const { token } = useAuth()

	const saveMessage = async (data) => {
		if (data) {
			try {
				await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/messages/save`,
					'POST',
					{
						messages: data.text,
						sender: data.name,
						time: data.time,
						conversationId: data.roomId,
					},
					{
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						Authorization: 'Bearer ' + token,
					}
				)
			} catch (error) {
				console.log(error)
			}
		}
	}

	const getRoomMessages = useCallback(async (roomId) => {
		if (roomId) {
			try {
				const getData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/messages/room/${roomId}`,
					'GET',
					null,
					{
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						Authorization: 'Bearer ' + token,
					}
				)
				setConversationMsgs(getData.data.message)
			} catch (error) {}
		}
	}, [])

	const value = {
		saveMessage,
		getRoomMessages,
		conversationMsgs,
		setLastMessage,
		lastMessage,
	}

	return (
		<MessageContext.Provider value={value}>{children}</MessageContext.Provider>
	)
}
