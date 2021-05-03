import './App.css'
import Chat from './components/Chat/Chat'
import SideBar from './components/SideBar/SideBar'
import {UsersProvider} from './context/userContext'
import {RoomsProvider} from './context/roomsContext'

function App() {
	return (
		<div className='app'>
			<div className='app__body'>
				<UsersProvider>
					<RoomsProvider>
						<SideBar />
						<Chat />
					</RoomsProvider>
				</UsersProvider>
			</div>
		</div>
	)
}

export default App
