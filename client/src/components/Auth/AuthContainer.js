import React from 'react'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom'
import Login from './Login'
import Signup from './SignUp'

const AuthContainer = () => {
	let route = (
		<Switch>
			<Route exact path='/signup'>
				<Signup />
			</Route>
			<Route exact path='/'>
				<Login />
			</Route>
			<Redirect to='/' />
		</Switch>
	)

	return <Router>{route}</Router>
}

export default AuthContainer
