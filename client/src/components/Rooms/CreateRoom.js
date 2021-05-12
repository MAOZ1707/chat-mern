import React from 'react'
import moment from 'moment'

import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useAuth} from '../../context/authContext'
import {useHttp} from '../../hooks/useHttp'

import './CreateRoom.css'
import {useRooms} from '../../context/roomsContext'

const CreateRoom = ({redirect}) => {
	const {error, isLoading, sendRequest} = useHttp()
	const {loadRooms} = useRooms()
	const {token, userId} = useAuth()

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.min(2, 'Must be 2 characters or more')
				.required('Required'),
		}),
		onSubmit: async (values) => {
			try {
				const response = await sendRequest(
					'/rooms/create',
					'POST',
					{
						title: values.name,
						created: moment(new Date()).utc().format('DD/MM/YYYY'),
						admin: userId,
					},
					{
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token,
					},
				)
				// const {data} = response
				if (response.statusText === 'OK') {
					loadRooms(userId)
					redirect('chat')
				}
			} catch (error) {}
		},
	})

	console.log(error)

	return (
		<div className='create-room__container'>
			<h3 className='create-room__title'>Create room</h3>
			{error && <div>{error}</div>}
			{isLoading && <div>Loading....</div>}
			<form onSubmit={formik.handleSubmit} className='create-room__form'>
				<label
					htmlFor='name'
					className={`create-room__label create-room__label__name ${
						!formik.errors.name && formik.touched.name && 'create-room__success'
					}`}
				>
					Room name
				</label>

				<input
					className='create-room__input create-room__name'
					id='room-name'
					name='name'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
					autoComplete='new-password'
				/>

				<div className='create-room__error__wrapper'>
					{formik.touched.name && formik.errors.name ? (
						<span className='create-room__error__msg'>
							{formik.errors.name}
						</span>
					) : null}
				</div>
				<button type='submit' className='create-room__btn'>
					Create
				</button>
			</form>
		</div>
	)
}

export default CreateRoom
