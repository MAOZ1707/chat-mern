import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom'

import Chat from './components/Chat/Chat'
import SideBar from './components/SideBar/SideBar'
import {UsersProvider} from './context/userContext'
import {RoomsProvider} from './context/roomsContext'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'

import {useAuth} from './context/authContext'

import './App.css'
import CreateRoom from './components/Rooms/CreateRoom'

function App() {
	const {token} = useAuth()

	let routes

	if (token) {
		routes = (
			<Switch>
				<Route exact path='/'>
					<SideBar />
					<Chat />
				</Route>
				<Route exact path='/create-room'>
					<CreateRoom />
				</Route>
				<Redirect exact to='/' />
			</Switch>
		)
	} else {
		routes = (
			<Switch>
				<Route exact path='/signup'>
					<SignUp />
				</Route>
				<Route exact path='/login'>
					<Login />
				</Route>
				<Redirect to='/signup' />
			</Switch>
		)
	}

	return (
		<Router>
			<div className='app'>
				<div className='app__body'>
					<UsersProvider>
						<RoomsProvider>{routes}</RoomsProvider>
					</UsersProvider>
				</div>
			</div>
		</Router>
	)
}

export default App
