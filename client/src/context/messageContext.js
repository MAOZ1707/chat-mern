import React, { useCallback, useContext, useEffect, useState } from 'react'

import axios from 'axios'

const MessageContext = React.createContext()

export function useMessage() {
	return useContext(MessageContext)
}

export function MessageProvider({ children }) {
	const [conversationMsgs, setConversationMsgs] = useState(null)
	const [lastMessage, setLastMessage] = useState()

	const saveMessage = async (data) => {
		if (data) {
			try {
				await axios({
					url: `http://localhost:5000/messages/save`,
					method: 'POST',
					data: {
						messages: data.text,
						sender: data.name,
						time: data.time,
						conversationId: data.roomId,
					},
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						// Authorization: 'Bearer ' + token,
					},
				})
			} catch (error) {
				console.log(error)
			}
		}
	}

	const getRoomMessages = useCallback(async (roomId) => {
		if (roomId) {
			try {
				const getData = await axios({
					url: `http://localhost:5000/messages/room/${roomId}`,
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						// Authorization: 'Bearer ' + token,
					},
				})
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

	return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
}
