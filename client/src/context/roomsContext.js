import axios from 'axios'
import React, {useCallback, useContext, useEffect, useState} from 'react'

const RoomsContext = React.createContext()

export function useRooms() {
	return useContext(RoomsContext)
}

export function RoomsProvider({children}) {
	const [rooms, setRooms] = useState([])
	const [selectedRoom, setSelectedRoom] = useState(null)

	const loadRooms = async (userId) => {
		console.log(userId)
		const response = await axios.get(
			`http://localhost:5000/rooms/user/${userId}`,
		)
		const data = await response.data.userRooms
		setRooms(data)
	}

	const chooseRoom = useCallback(async (roomId) => {
		const response = await axios.get(`http://localhost:5000/rooms/${roomId}`)
		const data = await response.data.room
		setSelectedRoom(data)
	}, [])

	const value = {
		loadRooms,
		chooseRoom,
		selectedRoom,
		rooms,
	}

	return <RoomsContext.Provider value={value}>{children}</RoomsContext.Provider>
}
