import React, {useEffect} from 'react'
import {useAuth} from '../../context/authContext'
import {useRooms} from '../../context/roomsContext'
import {useUsers} from '../../context/userContext'
import Chat from '../Chat/Chat'
import SideBar from '../SideBar/SideBar'

const Dashboard = ({user}) => {
	const {loadUsers} = useUsers()
	const {loadRooms} = useRooms()

	const {userId} = useAuth()

	useEffect(() => {
		loadUsers()
		loadRooms(userId)
	}, [userId])

	return (
		<React.Fragment>
			<SideBar username={user} />
			<Chat username={user} />
		</React.Fragment>
	)
}

export default Dashboard
