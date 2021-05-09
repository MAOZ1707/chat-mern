import axios from 'axios'
import React, {
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useState,
} from 'react'

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({children}) {
	const [userId, setUserId] = useState(null)
	const [token, setToken] = useState(null)
	const [username, setUsername] = useState(
		JSON.parse(localStorage.getItem('username')) || '',
	)
	const [loggedUser, setLoggedUser] = useState(null)

	const login = useCallback((uID, token) => {
		setToken(token)
		setUserId(uID)

		localStorage.setItem(
			'chat-user',
			JSON.stringify({userId: uID, token: token}),
		)
	}, [])

	const saveUserName = useCallback((user) => {
		setUsername(localStorage.setItem('username', JSON.stringify(user.name)))
	}, [])

	useEffect(() => {
		const storageData = JSON.parse(localStorage.getItem('chat-user'))
		if (storageData && storageData.token) {
			login(storageData.userId, storageData.token)
		}
	}, [login])

	const logout = useCallback(() => {
		setToken(null)
		setUserId(null)
		localStorage.removeItem('chat-user')
	}, [])

	const fetchUser = async (userId, token) => {
		if (userId) {
			try {
				const getData = await axios({
					url: `http://localhost:5000/users/user/${userId}`,
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						// Authorization: 'Bearer ' + token,
					},
				})
				const currentUser = getData.data
				setLoggedUser(currentUser.user)
				saveUserName(currentUser.user)
			} catch (error) {}
		}
	}

	const value = {
		login,
		logout,
		userId,
		token,
		fetchUser,
		loggedUser,
		username,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
