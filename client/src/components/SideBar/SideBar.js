import React, { useState } from 'react'

import Rooms from '../Rooms/Rooms'
import { useRooms } from '../../context/roomsContext'
import { AddOutlined, SupervisorAccount } from '@material-ui/icons'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import { Avatar, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CreateRoom from '../Rooms/CreateRoom'

import './SideBar.css'
import Friends from '../Friends/Friends'

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

const SideBar = ({ username }) => {
	const [options, setOptions] = useState('')

	const { rooms } = useRooms()
	const classes = useStyles()

	const getUserCharacters = username.slice(0, 2).toUpperCase()

	let route

	switch (options) {
		case 'create':
			route = <CreateRoom redirect={setOptions} />
			break
		case 'rooms':
			route = <Rooms rooms={rooms} />
			break
		case 'friends':
			route = <Friends redirect={setOptions} />
			break
		default:
			route = <Rooms rooms={rooms} />
			break
	}

	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<Avatar className={classes.large}>{getUserCharacters}</Avatar>
				<div className='sidebar__headerRight'>
					<IconButton onClick={() => setOptions('friends')}>
						<SupervisorAccount fontSize='small' />
					</IconButton>
					<IconButton onClick={() => setOptions('rooms')}>
						<ChatOutlinedIcon fontSize='small' />
					</IconButton>
					<IconButton onClick={() => setOptions('create')}>
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

			<div className='sidebar__chat'>{route}</div>
		</div>
	)
}

export default SideBar
