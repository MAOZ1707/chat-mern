import axios from 'axios'
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

	async function loadUsers() {
		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/users`
		)
		const data = await response.data.users
		setUsers(data)
	}

	const loadUserFriends = useCallback(async (userId) => {
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/users/${userId}/friends`,
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
