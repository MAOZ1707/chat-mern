import React, { useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import { useRooms } from '../../context/roomsContext'
import { useSocket } from '../../context/socketContext'
import { useUsers } from '../../context/userContext'
import Chat from '../Chat/Chat'
import SideBar from '../SideBar/SideBar'

const Dashboard = ({ user }) => {
	const { loadUsers } = useUsers()
	const { loadRooms } = useRooms()
	const socket = useSocket()

	const { userId } = useAuth()

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
