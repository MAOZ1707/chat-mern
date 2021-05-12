import React from 'react'
import Chat from '../Chat/Chat'
import SideBar from '../SideBar/SideBar'

const Dashboard = ({user}) => {
	console.log(user)

	return (
		<React.Fragment>
			<SideBar />
			<Chat />
		</React.Fragment>
	)
}

export default Dashboard
