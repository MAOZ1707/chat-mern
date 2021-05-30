import React, { useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import { useRooms } from '../../context/roomsContext'
import { useSocket } from '../../context/socketContext'
import { useTheme } from '../../context/themeContext'
import { useUsers } from '../../context/userContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import Chat from '../Chat/Chat'
import SideBar from '../SideBar/SideBar'

const Dashboard = ({ user }) => {
	const { loadUsers } = useUsers()
	const { loadRooms } = useRooms()
	const { selectTheme } = useTheme()
	const { socket } = useSocket()
	const { setValue } = useLocalStorage('user-Theme', '')
	const { userId } = useAuth()

	useEffect(() => {
		if (selectTheme) {
			setValue(selectTheme)
		} else {
			setValue('')
		}
	}, [selectTheme])

	useEffect(() => {
		loadUsers()
		loadRooms(userId)
	}, [userId])

	return (
		<React.Fragment>
			{socket && (
				<>
					<SideBar socket={socket} username={user} />
					<Chat socket={socket} username={user} />
				</>
			)}
		</React.Fragment>
	)
}

export default Dashboard
