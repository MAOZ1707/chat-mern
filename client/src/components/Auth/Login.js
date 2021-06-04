import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import { useHttp } from '../../hooks/useHttp'
import { useAuth } from '../../context/authContext'

import './Auth.css'
import { Link } from 'react-router-dom'
import Loader from '../../UiElements/Loader/Loader'

const Login = () => {
	const { error, isLoading, sendRequest } = useHttp()
	const { login } = useAuth()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.min(6, 'Must be 6 characters or more')
				.required('Required'),
			email: Yup.string().email('invalid email address').required('Required'),
		}),
		onSubmit: async (values) => {
			try {
				const response = await sendRequest(
					`http://localhost:5000/users/login`,
					'POST',
					{
						email: values.email,
						password: values.password,
					},
					{
						'Content-Type': 'application/json',
					}
				)
				const data = response.data
				login(data.user._id, data.token, data.user.name)
			} catch (error) {}
		},
	})

	return (
		<div className='auth__container'>
			<h3 className='aut__title'>Login</h3>
			{error && <div>{error}</div>}
			{isLoading && <Loader />}
			<form onSubmit={formik.handleSubmit} className='auth__form'>
				<label
					htmlFor='email'
					className={`auth__label auth__label__email ${
						!formik.errors.email && formik.touched.email && 'auth__success'
					}`}>
					Email
					{formik.touched.email && formik.errors.email ? (
						<span className='auth__error__msg'>{formik.errors.email}</span>
					) : null}
				</label>
				<input
					className='auth__input auth__email'
					id='email'
					name='email'
					type='email'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
					autoComplete='new-password'
				/>

				<label
					htmlFor='password'
					className={`auth__label auth__label__password ${
						!formik.errors.password &&
						formik.touched.password &&
						'auth__success'
					}`}>
					Password
					{formik.touched.password && formik.errors.password ? (
						<span className='auth__error__msg'>{formik.errors.password}</span>
					) : null}
				</label>
				<input
					className='auth__input aut__password'
					id='password'
					name='password'
					type='password'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
				/>

				<button type='submit' className='auth__btn'>
					Submit
				</button>

				<div className='auth__link'>
					<p>
						Dont have account? <Link to='/signup'>Sign up</Link>
					</p>
				</div>
			</form>
		</div>
	)
}

export default Login
