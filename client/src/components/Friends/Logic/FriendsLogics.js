import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/authContext'
import { useSocket } from '../../../context/socketContext'
import { useUsers } from '../../../context/userContext'
import { useHttp } from '../../../hooks/useHttp'

const FriendsLogics = () => {
	const [anchorEl, setAnchorEl] = useState(null)
	const { setUserFriends, loadUserFriends } = useUsers()
	const { userId, token } = useAuth()
	const { sendRequest } = useHttp()
	const { chatUsers, socket } = useSocket()
	const [load, setLoad] = useState(false)
	const [openPrivateMessage, setOpenPrivateMessage] = useState(false)
	const [selectedFriend, setSelectedFriend] = useState('')

	useEffect(() => {
		loadUserFriends(userId)
	}, [loadUserFriends, userId])

	const handleClick = (event, friend) => {
		setSelectedFriend(friend.email)
		setAnchorEl(event.currentTarget)
	}

	const inviteToRoom = async (roomId, email) => {
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/rooms/${roomId}/addUser`,
				'POST',
				{
					email: email,
					admin: userId,
				},
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				}
			)
			if (response.statusText === 'OK') {
				setAnchorEl(null)
			}
		} catch (error) {}
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	const removeFriend = async (friendEmail) => {
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/users/remove-friend`,
				'POST',
				{
					admin: userId,
					friendEmail,
				},
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				}
			)
			const { updateUser } = response.data

			if (response.statusText === 'OK') {
				setUserFriends(updateUser.friends)
				setLoad((prev) => !prev)
			}
		} catch (error) {}
	}

	const sendPrivateMessage = (friend) => {
		if (socket) {
			socket.emit('privateMessage', friend)
			setSelectedFriend(friend)
			setOpenPrivateMessage(true)
		}
	}

	return {
		anchorEl,
		sendPrivateMessage,
		removeFriend,
		handleClose,
		inviteToRoom,
		handleClick,
		load,
		setLoad,
		openPrivateMessage,
		setOpenPrivateMessage,
		selectedFriend,
		setSelectedFriend,
		chatUsers,
	}
}
export default FriendsLogics
