import React from 'react'
import SideBarChat from '../SideBar/SideBarChat'

const Rooms = ({rooms}) => {
	return (
		<React.Fragment>
			{rooms &&
				rooms.map((room) => (
					<React.Fragment key={room._id}>
						<SideBarChat room={room} />
					</React.Fragment>
				))}
		</React.Fragment>
	)
}

export default Rooms
