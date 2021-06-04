import React from 'react'
import { UsersProvider } from './context/userContext'
import { RoomsProvider } from './context/roomsContext'
import { ThemeContextProvider } from './context/themeContext'
import { MessageProvider } from './context/messageContext'
import { SocketProvider } from './context/socketContext'
import { useAuth } from './context/authContext'

import './App.css'

import { Suspense } from 'react'
import Loader from './UiElements/Loader/Loader'
const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'))
const AuthContainer = React.lazy(() =>
	import('./components/Auth/AuthContainer')
)

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
									<Suspense fallback={<Loader />}>
										<Dashboard user={username} />
									</Suspense>
								</ThemeContextProvider>
							</MessageProvider>
						</RoomsProvider>
					</SocketProvider>
				</UsersProvider>
			</div>
		</div>
	)

	return token && username ? (
		dashboard
	) : (
		<Suspense fallback={<Loader />}>
			<AuthContainer />
		</Suspense>
	)
}

export default App
