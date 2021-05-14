import React from 'react'
import { Avatar } from '@material-ui/core'

import { useHttp } from '../../hooks/useHttp'
import { useAuth } from '../../context/authContext'
import { useUsers } from '../../context/userContext'

import './Friends.css'

const FriendsView = ({ user, redirect }) => {
	const { sendRequest } = useHttp()
	const { username, userId } = useAuth()
	const { setUserFriends } = useUsers()

	const getUserCharacters = user.name.slice(0, 2).toUpperCase()

	const addFriend = async () => {
		const admin = { username, userId }
		try {
			const response = await sendRequest(
				'users/add-friend',
				'PATCH',
				{
					friend: user,
					admin: admin,
				},
				{
					'Content-Type': 'application/json',
					// Authorization: 'Bearer ' + token,
				}
			)
			const { data } = response
			console.log(data.user)

			if (response.statusText === 'OK') {
			}
		} catch (error) {}
	}

	return (
		<div className='friends_view'>
			<Avatar>{getUserCharacters}</Avatar>
			<div className='friends_view__info'>
				<h2>{user.name}</h2>
				<p>{user.email}</p>
			</div>
			<div className='friends_view__footer'>
				<button className='friends__btn_add' onClick={addFriend}>
					Add
				</button>
			</div>
		</div>
	)
}

export default FriendsView
