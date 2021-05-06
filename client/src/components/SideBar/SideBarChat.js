import React, {useEffect} from 'react'
import {Avatar} from '@material-ui/core'

import {useRooms} from '../../context/roomsContext'

import io from 'socket.io-client'

import './SideBarChat.css'

let socket = io('http://localhost:5000')

const SideBarChat = ({room}) => {
	const {chooseRoom} = useRooms()

	console.log(room)

	const selectedRoom = () => {
		chooseRoom(room._id)

		socket.emit('join', {room: room.title, admin: room.admin})
	}

	return (
		<div className='sidebarChat' onClick={selectedRoom}>
			<Avatar />
			<div className='sidebarChat__info'>
				<h2>{room.title}</h2>
				<p>This is the last message</p>
			</div>
		</div>
	)
}

export default SideBarChat
