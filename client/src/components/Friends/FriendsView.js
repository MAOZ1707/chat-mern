import React, { useCallback, useState } from 'react'
import { Avatar } from '@material-ui/core'

import { useHttp } from '../../hooks/useHttp'
import { useAuth } from '../../context/authContext'
import { useUsers } from '../../context/userContext'

import './Friends.css'

const FriendsView = ({ user, redirect }) => {
	const { sendRequest } = useHttp()
	const { username, userId, token } = useAuth()
	const { setUserFriends, userFriends } = useUsers()
	const [load, setLoad] = useState(false)

	const getUserCharacters = user.name.slice(0, 2).toUpperCase()

	const addFriend = useCallback(async () => {
		const admin = { username, userId }
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/users/add`,
				'POST',
				{
					friend: user,
					admin: admin,
				},
				{
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: 'Bearer ' + token,
				}
			)
			const { data } = response
			setUserFriends([...userFriends, data.user])

			if (response.statusText === 'OK') {
				redirect('rooms')
				setLoad((prev) => !prev)
			}
		} catch (error) {}
	}, [])

	return (
		<div className='friends_view'>
			<Avatar>{getUserCharacters}</Avatar>
			<div className='friends_view__info'>
				<h2>{user.name}</h2>
				<p>{user.email}</p>
			</div>
			<div className='friends_view__footer'>
				<button className='friends__btn_add' onClick={addFriend}>
					Add to list
				</button>
			</div>
		</div>
	)
}

export default FriendsView
