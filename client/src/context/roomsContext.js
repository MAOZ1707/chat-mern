import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/useHttp'
import { useAuth } from './authContext'

const RoomsContext = React.createContext()

export function useRooms() {
	return useContext(RoomsContext)
}

export function RoomsProvider({ children }) {
	const [rooms, setRooms] = useState([])
	const [selectedRoom, setSelectedRoom] = useState(null)
	const [roomUsers, setRoomUsers] = useState(null)
	const { token } = useAuth()
	const { sendRequest } = useHttp()

	const loadRooms = useCallback(async (userId) => {
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/rooms/user/${userId}`,
				'GET',
				null,
				{
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: 'Bearer ' + token,
				}
			)
			const data = await response.data.userRooms
			setRooms(data)
		} catch (error) {}
	}, [])

	const loadRoomUsers = useCallback(async (roomId) => {
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/rooms/room/${roomId}/users`,
				'GET',
				null,
				{
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: 'Bearer ' + token,
				}
			)
			const { roomUsers } = await response.data
			setRoomUsers(roomUsers)
		} catch (error) {}
	}, [])

	const chooseRoom = useCallback(async (roomId) => {
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/rooms/${roomId}`,
				'GET',
				null,
				{
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: 'Bearer ' + token,
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
