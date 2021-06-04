import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/useHttp'

const RoomsContext = React.createContext()

export function useRooms() {
	return useContext(RoomsContext)
}

export function RoomsProvider({ children }) {
	const [rooms, setRooms] = useState([])
	const [selectedRoom, setSelectedRoom] = useState(null)
	const [roomUsers, setRoomUsers] = useState(null)

	const { sendRequest } = useHttp()

	const loadRooms = useCallback(async (userId) => {
		try {
			const response = await sendRequest(
				`http://localhost:5000/rooms/user/${userId}`,
				'GET',
				{
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					// Authorization: 'Bearer ' + token,
				}
			)
			const data = await response.data.userRooms
			setRooms(data)
		} catch (error) {}
	}, [])

	const loadRoomUsers = useCallback(async (roomId) => {
		try {
			const response = await sendRequest(
				`http://localhost:5000/rooms/room/${roomId}/users`,
				'GET',
				{
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					// Authorization: 'Bearer ' + token,
				}
			)
			const { roomUsers } = await response.data
			setRoomUsers(roomUsers)
		} catch (error) {}
	}, [])

	const chooseRoom = useCallback(async (roomId) => {
		try {
			const response = await sendRequest(
				`http://localhost:5000/rooms/${roomId}`,
				'GET',
				{
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					// Authorization: 'Bearer ' + token,
				}
			)
			const data = await response.data.room
			setSelectedRoom(data)
		} catch (error) {}
	}, [])

	useEffect(() => {
		if (selectedRoom) {
			loadRoomUsers(selectedRoom._id)
		}
	}, [selectedRoom])

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
