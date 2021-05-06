import React, {useEffect, useState} from 'react'

import Rooms from '../Rooms/Rooms'

import {useUsers} from '../../context/userContext'
import {useRooms} from '../../context/roomsContext'
import {useAuth} from '../../context/authContext'

import {AddOutlined, SupervisorAccount} from '@material-ui/icons'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import {Avatar, IconButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import './SideBar.css'
import CreateRoom from '../Rooms/CreateRoom'

const useStyles = makeStyles((theme) => ({
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	large: {
		width: theme.spacing(6),
		height: theme.spacing(6),
	},
}))

const SideBar = () => {
	const [addRoom, setAddRoom] = useState(false)

	const {loadUsers} = useUsers()
	const {loadRooms, rooms} = useRooms()
	const classes = useStyles()
	const {userId} = useAuth()

	console.log(userId)

	useEffect(() => {
		loadUsers()
		loadRooms(userId)
	}, [userId])

	const handleCreateRoom = () => {
		setAddRoom(true)
	}

	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<Avatar className={classes.large}>MC</Avatar>
				<div className='sidebar__headerRight'>
					<IconButton>
						<SupervisorAccount fontSize='small' />
					</IconButton>
					<IconButton>
						<ChatOutlinedIcon fontSize='small' />
					</IconButton>
					<IconButton onClick={handleCreateRoom}>
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
				{addRoom ? <CreateRoom close={setAddRoom} /> : <Rooms rooms={rooms} />}
			</div>
		</div>
	)
}

export default SideBar
