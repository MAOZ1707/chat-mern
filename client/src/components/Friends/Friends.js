import React, { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { useHttp } from '../../hooks/useHttp'
import FriendsView from './FriendsView'

import './Friends.css'
import Loader from '../../UiElements/Loader/Loader'
import { useAuth } from '../../context/authContext'

const Friends = ({ redirect }) => {
	const { error, isLoading, sendRequest } = useHttp()
	const [friend, setFriend] = useState(null)
	const { token } = useAuth()

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('invalid email address').required('Required'),
		}),
		onSubmit: async (values) => {
			try {
				const response = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/users/find-friend${
						'?email=' + values.email
					}`,
					'GET',
					null,
					{
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						Authorization: 'Bearer ' + token,
					}
				)
				const { data } = response
				setFriend(data.user)
			} catch (error) {}
		},
	})

	return (
		<div className='friends__container'>
			<h3 className='friends__title'>Add Friends</h3>
			{error && <div>{error}</div>}
			{isLoading && <Loader />}
			<form onSubmit={formik.handleSubmit} className='friends__form'>
				<label
					htmlFor='email'
					className={`friends__label friends__label__name ${
						!formik.errors.email && formik.touched.email && 'friends__success'
					}`}>
					User email
				</label>

				<input
					className='friends__input friends__name'
					id='email'
					name='email'
					type='email'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
				/>

				<div className='friends__error__wrapper'>
					{formik.touched.email && formik.errors.email ? (
						<span className='friends__error__msg'>{formik.errors.email}</span>
					) : null}
				</div>
				<button type='submit' className='friends__btn'>
					Find
				</button>
			</form>

			<div className='friends-view__wrapper'>
				{friend && <FriendsView user={friend} redirect={redirect} />}
			</div>
		</div>
	)
}

export default Friends
