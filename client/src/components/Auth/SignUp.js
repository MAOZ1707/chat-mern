import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useHttp } from '../../hooks/useHttp'
import { useAuth } from '../../context/authContext'

import './Auth.css'

const Signup = () => {
	const { sendRequest } = useHttp()

	const { login } = useAuth()

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.max(15, 'Must be 15 characters or less')
				.required('Required'),
			email: Yup.string().email('invalid email address').required('Required'),
			password: Yup.string()
				.min(6, 'Must be at least 6 characters')
				.required('Required'),
		}),
		onSubmit: async (values) => {
			console.log(values)
			try {
				const response = await sendRequest(
					`http://localhost:5000/users/signup`,
					'POST',
					{
						name: values.name,
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
			<h3 className='aut__title'>Sign up</h3>
			<form onSubmit={formik.handleSubmit} className='auth__form'>
				<label
					htmlFor='name'
					className={`auth__label auth__label__name ${
						!formik.errors.name && formik.touched.name && 'auth__success'
					}`}>
					Name
					{formik.touched.name && formik.errors.name ? (
						<span className='auth__error__msg'>{formik.errors.name}</span>
					) : null}
				</label>
				<input
					className='auth__input auth__name'
					autoComplete='name'
					id='name'
					name='name'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
				/>

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
						You have account? <Link to='/login'>Login</Link>{' '}
					</p>
				</div>
			</form>
		</div>
	)
}

export default Signup
