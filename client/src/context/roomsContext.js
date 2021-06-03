import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'

const RoomsContext = React.createContext()

export function useRooms() {
	return useContext(RoomsContext)
}

export function RoomsProvider({ children }) {
	const [rooms, setRooms] = useState([])
	const [selectedRoom, setSelectedRoom] = useState(null)
	const [roomUsers, setRoomUsers] = useState(null)

	const loadRooms = async (userId) => {
		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/rooms/user/${userId}`
		)
		const data = await response.data.userRooms
		setRooms(data)
	}

	useEffect(() => {
		if (selectedRoom) {
			loadRoomUsers(selectedRoom._id)
		}
	}, [selectedRoom])

	const loadRoomUsers = async (roomId) => {
		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/rooms/room/${roomId}/users`
		)
		const { roomUsers } = await response.data
		setRoomUsers(roomUsers)
	}

	const chooseRoom = useCallback(async (roomId) => {
		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/rooms/${roomId}`
		)
		const data = await response.data.room
		setSelectedRoom(data)
	}, [])

	const value = {
		loadRooms,
		chooseRoom,
		selectedRoom,
		setSelectedRoom,
		setRooms,
		rooms,
		roomUsers,
	}

	return <RoomsContext.Provider value={value}>{children}</RoomsContext.Provider>
}
