import React, {useCallback, useContext, useEffect, useState} from 'react'

import axios from 'axios'
const MessageContext = React.createContext()

export function useMessage() {
	return useContext(MessageContext)
}

export function MessageProvider({children}) {
	const [conversationMsgs, setConversationMsgs] = useState(null)

	// TODO --> GET MESSAGES FROM ROOM ID

	const saveMessage = async (data) => {
		if (data) {
			try {
				const getData = await axios({
					url: `http://localhost:5000/messages/save`,
					method: 'POST',
					data: {
						messages: data.text,
						sender: data.name,
						time: new Date().getDate(),
						conversationId: data.roomId,
					},
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						// Authorization: 'Bearer ' + token,
					},
				})
				console.log(getData.data)
			} catch (error) {}
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
	}

	return (
		<MessageContext.Provider value={value}>{children}</MessageContext.Provider>
	)
}
