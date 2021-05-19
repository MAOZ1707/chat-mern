import React, { useCallback, useContext, useEffect, useState } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [userId, setUserId] = useState(null)
	const [token, setToken] = useState(null)
	const [username, setUsername] = useState(null)

	const login = useCallback((uID, token, username) => {
		setToken(token)
		setUserId(uID)
		setUsername(username)

		localStorage.setItem(
			'chat-user',
			JSON.stringify({ username: username, userId: uID, token: token })
		)
	}, [])

	useEffect(() => {
		const storageData = JSON.parse(localStorage.getItem('chat-user'))
		if (storageData && storageData.token) {
			login(storageData.userId, storageData.token, storageData.username)
		}
	}, [login])

	const logout = useCallback(() => {
		setToken(null)
		setUserId(null)
		setUsername(null)
		localStorage.removeItem('chat-user')
	}, [])

	const value = {
		login,
		logout,
		userId,
		token,
		username,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
