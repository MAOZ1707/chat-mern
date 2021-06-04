import React, { useCallback, useContext, useState } from 'react'
import { useHttp } from '../hooks/useHttp'

const UsersContext = React.createContext()

export function useUsers() {
	return useContext(UsersContext)
}

export function UsersProvider({ children }) {
	const { sendRequest } = useHttp()

	const [users, setUsers] = useState([])
	const [userFriends, setUserFriends] = useState([])

	const loadUsers = useCallback(async () => {
		try {
			const response = await sendRequest(`http://localhost:5000/users`, 'GET')
			const data = await response.data.users
			setUsers(data)
		} catch (error) {}
	}, [])

	const loadUserFriends = useCallback(async (userId) => {
		try {
			const response = await sendRequest(
				`http://localhost:5000/users/${userId}/friends`,
				'GET'
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
