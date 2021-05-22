import { UsersProvider } from './context/userContext'
import { RoomsProvider } from './context/roomsContext'
import { ThemeContextProvider } from './context/themeContext'
import { MessageProvider } from './context/messageContext'
import { SocketProvider } from './context/socketContext'

import { useAuth } from './context/authContext'
import Dashboard from './components/Dashboard/Dashboard'
import AuthContainer from './components/Auth/AuthContainer'

import './App.css'

function App() {
	const { token, username, userId } = useAuth()

	const dashboard = (
		<div className='app'>
			<div className='app__body'>
				<UsersProvider>
					<SocketProvider id={userId}>
						<RoomsProvider>
							<MessageProvider>
								<ThemeContextProvider>
									<Dashboard user={username} />
								</ThemeContextProvider>
							</MessageProvider>
						</RoomsProvider>
					</SocketProvider>
				</UsersProvider>
			</div>
		</div>
	)

	return token && username ? dashboard : <AuthContainer />
}

export default App
