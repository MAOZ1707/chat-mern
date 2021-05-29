const Rooms = require('../model/roomsModel')
const Users = require('../model/usersModel')

exports.getRoomById = (roomId) => {
	return new Promise((resolve, reject) => {
		const room = Rooms.findById(roomId)

		if (!room) reject('Could not find room')

		resolve(room)
	})
}

exports.getRoomByUserId = (userId) => {
	return new Promise(async (resolve, reject) => {
		let existingUser = await Users.findById(userId)
		if (!existingUser) reject('Could not find user')

		//  data shaping
		const userRooms = await Rooms.find()
			.where('_id')
			.in(existingUser.rooms)
			.exec()

		resolve(userRooms)
	})
}

exports.createRoom = (room) => {
	return new Promise(async (resolve, reject) => {
		if (!room) reject('Could not create room, Please check your credentials')

		let checkRoomName
		try {
			let userRooms = await Rooms.find({ admin: room.admin })
			checkRoomName = userRooms.filter(
				(existingRoom) => existingRoom.title === room.title
			)
		} catch (error) {
			reject('Something went wrong please try again later')
		}

		if (checkRoomName && checkRoomName.length > 0) {
			reject('Room name must be unique!')
		}

		let newRoom = await Rooms.create({
			created: room.created,
			title: room.title,
			users: [room.admin],
			admin: room.admin,
		})

		if (!newRoom) {
			reject('We have a problem please try again later')
		}
		await Users.findByIdAndUpdate(newRoom.admin, {
			$addToSet: { rooms: newRoom._id },
		})

		resolve(newRoom)
	})
}

exports.deleteRoom = (roomId, admin) => {
	return new Promise(async (resolve, reject) => {
		// check room
		let room = await Rooms.findById(roomId)
		if (!room) reject('Could not find room')

		// check admin
		if (room.admin.toString() !== admin.toString()) {
			reject(
				'Sorry you dont have permission !, only admin can add / delete users'
			)
		}
		// delete room from user rooms
		room.users.map(
			async (user) =>
				await Users.findByIdAndUpdate(
					user._id,
					{ $pull: { rooms: roomId } },
					(err) => {
						if (err) reject(err)
					}
				)
		)
		// delete room from database
		Rooms.findByIdAndDelete(roomId, (err, data) => {
			if (err) reject(err)
			resolve(data)
		})
	})
}

exports.addUserToRoom = (roomId, friendEmail, admin) => {
	console.log(roomId)

	return new Promise(async (resolve, reject) => {
		let existingUser = await Users.findOne({ email: friendEmail })
		if (!existingUser) reject('Could not find user')

		let room = await Rooms.findById(roomId)
		if (!room) reject('Could not find room')

		// check if user is admin
		if (room.admin.toString() !== admin.toString()) {
			reject(
				'Sorry you dont have permission !, only admin can add / delete users'
			)
		}

		// add room to user rooms
		Users.findByIdAndUpdate(
			existingUser._id,
			{
				$addToSet: { rooms: room._id },
			},
			(err, data) => {
				if (err) reject(err)
				// resolve(data)
				Rooms.findByIdAndUpdate(
					room._id,
					{
						$addToSet: { users: data._id },
					},
					(err, data) => {
						if (err) reject(err)
						resolve(data)
					}
				)
			}
		)
	})
}

exports.removeUser = (roomId, userId, admin) => {
	return new Promise(async (resolve, reject) => {
		let existingUser = await Users.findById({ _id: userId })
		if (!existingUser) reject('Could not find user')

		let room = await Rooms.findById(roomId)
		if (!room) reject('Could not find room')

		// check if user is admin
		if (room.admin.toString() !== admin.toString()) {
			reject(
				'Sorry you dont have permission !, only admin can add / delete users'
			)
		}

		Rooms.findByIdAndUpdate(
			room._id,
			{
				$pull: { users: userId },
			},
			(err, data) => {
				if (err) reject(err)
				resolve(data)
			}
		)
	})
}

exports.getRoomUsers = (roomId) => {
	return new Promise((resolve, reject) => {
		Rooms.findById({ _id: roomId }, async (err, room) => {
			if (err) reject(err)
			let users = []
			for (id of room.users) {
				await Users.findById(id, (err, user) => {
					if (err) reject(err)
					users.push(user.name)
				})
			}
			resolve(users)
		})
	})
}
