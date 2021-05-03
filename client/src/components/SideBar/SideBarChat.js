import React from 'react'
import {Avatar} from '@material-ui/core'

import {useRooms} from '../../context/roomsContext'

import './SideBarChat.css'

const SideBarChat = ({room}) => {
	const {chooseRoom} = useRooms()

	return (
		<div className='sidebarChat' onClick={() => chooseRoom(room._id)}>
			<Avatar />
			<div className='sidebarChat__info'>
				<h2>{room.title}</h2>
				<p>This is the last message</p>
			</div>
		</div>
	)
}

export default SideBarChat
