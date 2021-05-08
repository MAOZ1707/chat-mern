import React, {useContext, useEffect, useState} from 'react'

const MessageContext = React.createContext()

export function useMessage() {
	return useContext(MessageContext)
}

export function MessageProvider({children}) {
	const [message, setMessage] = useState(null)

	useEffect(() => {}, [])

	const value = {}

	return (
		<MessageContext.Provider value={value}>{children}</MessageContext.Provider>
	)
}
