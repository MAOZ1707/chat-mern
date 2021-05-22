import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
	return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
	const [socket, setSocket] = useState()
	const ENDPOINT = 'http://localhost:8000'

	console.log(socket)
	useEffect(() => {
		const newSocket = io(ENDPOINT)
		setSocket(newSocket)
		return () => newSocket.close()
	}, [ENDPOINT])

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	)
}
