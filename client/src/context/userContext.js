import axios from 'axios'
import React, {useContext, useState} from 'react'

const UsersContext = React.createContext()

export function useUsers() {
	return useContext(UsersContext)
}

export function UsersProvider({id, children}) {
	const [users, setUsers] = useState([])

	async function loadUsers() {
		const response = await axios.get('http://localhost:5000/users')
		const data = await response.data.users
		setUsers(data)
		console.log(data)
	}

	const value = {
		loadUsers,
		users,
		loginUser: id,
	}

	return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}
