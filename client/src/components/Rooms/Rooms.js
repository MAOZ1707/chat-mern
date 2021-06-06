import React from 'react'
import SideBarChat from '../SideBar/SideBarChat'

const Rooms = ({ rooms, option, search }) => {
	let searchRoom
	if (option === '' || option === 'rooms') {
		searchRoom = rooms.filter((room) =>
			room.title.toLowerCase().includes(search.toLowerCase())
		)
	}

	return (
		<React.Fragment>
			{searchRoom &&
				searchRoom.map((room) => (
					<React.Fragment key={room._id}>
						<SideBarChat room={room} />
					</React.Fragment>
				))}
		</React.Fragment>
	)
}

export default Rooms
