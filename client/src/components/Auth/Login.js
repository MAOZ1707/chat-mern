import {useFormik} from 'formik'
import React from 'react'
import {Link} from 'react-router-dom'
import * as Yup from 'yup'

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import {useHttp} from '../../hooks/useHttp'
import {useAuth} from '../../context/authContext'

import './Auth.css'

const Login = () => {
	const {error, isLoading, sendRequest} = useHttp()
	const {login, getLoggedUser} = useAuth()

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
			console.log(values)
			try {
				const response = await sendRequest(
					'http://localhost:5000/users/login',
					'POST',
					{
						email: values.email,
						password: values.password,
					},
					{
						'Content-Type': 'application/json',
					},
				)
				const data = response.data
				login(data.user._id, data.token)
				getLoggedUser(data.user._id, data.token)
			} catch (error) {}
		},
	})

	return (
		<div className='auth__container'>
			<h3 className='aut__title'>Login</h3>
			{error && <div>{error}</div>}
			{isLoading && <div>Loading....</div>}
			<form onSubmit={formik.handleSubmit} className='auth__form'>
				<label
					htmlFor='email'
					className={`auth__label auth__label__email ${
						!formik.errors.email && formik.touched.email && 'auth__success'
					}`}
				>
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
					}`}
				>
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
					<Link to='/signup'>
						<KeyboardBackspaceIcon
							fontSize='large'
							style={{color: '#fff', cursor: 'pointer'}}
						/>
					</Link>
				</div>
			</form>
		</div>
	)
}

export default Login
