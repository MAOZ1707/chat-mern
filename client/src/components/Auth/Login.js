import {useFormik} from 'formik'
import React from 'react'
import * as Yup from 'yup'

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import './Auth.css'
import {IconButton} from '@material-ui/core'
import {Link} from 'react-router-dom'

const Login = () => {
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
		}),
		onSubmit: (values) => {
			console.log(values)
		},
	})

	return (
		<div className='auth__container'>
			<h3 className='aut__title'>Login</h3>
			<form onSubmit={formik.handleSubmit} className='auth__form'>
				<label
					htmlFor='name'
					className={`auth__label auth__label__name ${
						!formik.errors.name && formik.touched.name && 'auth__success'
					}`}
				>
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
