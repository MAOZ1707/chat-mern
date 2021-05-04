import React, {useEffect} from 'react'

import SideBarChat from './SideBarChat'
import {useUsers} from '../../context/userContext'
import {useRooms} from '../../context/roomsContext'

import {AddOutlined, DonutLargeOutlined} from '@material-ui/icons'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import {Avatar, IconButton} from '@material-ui/core'

import './SideBar.css'

const SideBar = () => {
	const {loadUsers} = useUsers()
	const {loadRooms, rooms} = useRooms()

	useEffect(() => {
		loadUsers()
		loadRooms('608d8c00d178e828a020b489')
	}, [])

	const createRoom = () => {
		console.log('move to create room')
	}

	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
				<div className='sidebar__headerRight'>
					<IconButton>
						<DonutLargeOutlined fontSize='small' />
					</IconButton>
					<IconButton>
						<ChatOutlinedIcon fontSize='small' />
					</IconButton>
					<IconButton onClick={createRoom}>
						<AddOutlined />
					</IconButton>
				</div>
			</div>

			<div className='sidebar__search'>
				<div className='sidebar__searchContainer'>
					<SearchOutlinedIcon />
					<input type='text' placeholder='Search or start new chat' />
				</div>
			</div>

			<div className='sidebar__chat'>
				{rooms &&
					rooms.map((room) => (
						<React.Fragment key={room._id}>
							<SideBarChat room={room} />
						</React.Fragment>
					))}
			</div>
		</div>
	)
}

export default SideBar
