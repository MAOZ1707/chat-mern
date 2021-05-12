import {UsersProvider} from './context/userContext'
import {RoomsProvider} from './context/roomsContext'

import {useAuth} from './context/authContext'
import {MessageProvider} from './context/messageContext'
import Dashboard from './components/Dashboard/Dashboard'
import AuthContainer from './components/Auth/AuthContainer'

import './App.css'

function App() {
	const {token, username} = useAuth()

	const dashboard = (
		<div className='app'>
			<div className='app__body'>
				<UsersProvider>
					<RoomsProvider>
						<MessageProvider>
							<Dashboard user={username} />
						</MessageProvider>
					</RoomsProvider>
				</UsersProvider>
			</div>
		</div>
	)

	return token && username ? dashboard : <AuthContainer />
}

export default App
