import axios from 'axios'
import React, { useContext, useState } from 'react'

const UsersContext = React.createContext()

export function useUsers() {
	return useContext(UsersContext)
}

export function UsersProvider({ children }) {
	const [users, setUsers] = useState([])
	const [userFriends, setUserFriends] = useState([])

	async function loadUsers() {
		const response = await axios.get('http://localhost:5000/users')
		const data = await response.data.users
		setUsers(data)
		console.log(data)
	}

	const value = {
		loadUsers,
		users,
		setUserFriends,
		userFriends,
	}

	return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}
