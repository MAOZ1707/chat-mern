import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { useHttp } from '../../hooks/useHttp'
import FriendsView from './FriendsView'

import './Friends.css'

const Friends = () => {
	const { error, isLoading, sendRequest } = useHttp()

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
					`http://localhost:5000/users//find-friends${'?email=' + values.email}`,
					'GET'
				)
				const { data } = response
				console.log(data)
			} catch (error) {}
		},
	})

	return (
		<div className='friends__container'>
			<h3 className='friends__title'>Friends</h3>
			{error && <div>{error}</div>}
			{isLoading && <div>Loading....</div>}
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
				<FriendsView />
			</div>
		</div>
	)
}

export default Friends
