import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
	return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
	const [socket, setSocket] = useState()
	const [chatUsers, setChatUsers] = useState([])

	const ENDPOINT = 'http://localhost:8000'
	useEffect(() => {
		const newSocket = io(ENDPOINT)
		setSocket(newSocket)
		return () => newSocket.close()
	}, [ENDPOINT])

	const values = {
		socket,
		chatUsers,
		setChatUsers,
	}

	return (
		<SocketContext.Provider value={values}>{children}</SocketContext.Provider>
	)
}
