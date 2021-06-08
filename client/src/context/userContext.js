import React, { useCallback, useContext, useState } from 'react'
import { useHttp } from '../hooks/useHttp'
import { useAuth } from './authContext'

const UsersContext = React.createContext()

export function useUsers() {
	return useContext(UsersContext)
}

export function UsersProvider({ children }) {
	const { sendRequest } = useHttp()
	const { token } = useAuth()
	const [users, setUsers] = useState([])
	const [userFriends, setUserFriends] = useState([])

	const loadUsers = useCallback(async () => {
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/users`,
				'GET',
				null,
				{
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: 'Bearer ' + token,
				}
			)
			const data = await response.data.users
			setUsers(data)
		} catch (error) {}
	}, [])

	const loadUserFriends = useCallback(async (userId) => {
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/users/${userId}/friends`,
				'GET',
				null,
				{
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: 'Bearer ' + token,
				}
			)
			const { data } = response
			setUserFriends(data.friends)
		} catch (error) {}
	}, [])

	const value = {
		loadUsers,
		setUserFriends,
		loadUserFriends,
		users,
		userFriends,
	}

	return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}
