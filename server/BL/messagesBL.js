const Messages = require('../model/messagesModel')
const Rooms = require('../model/roomsModel')
const Users = require('../model/usersModel')

exports.getMessageById = (msgId) => {
	return new Promise((resolve, reject) => {
		const msg = Messages.findById(msgId)

		if (!msg) reject('Could not find message')

		resolve(msg)
	})
}
exports.saveMessageByRoom = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const existingRoom = await Rooms.findById(data.conversationId)

			if (!existingRoom) reject('Could not find room')

			let newMessage = Messages.create({
				text: data.messages,
				name: data.sender,
				time: data.time,
				conversationId: existingRoom._id,
				favorite: false,
			})

			resolve(newMessage)
		} catch (error) {
			reject(error)
		}
	})
}

exports.getMessageByRoomId = (roomId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const existingRoom = await Rooms.findById(roomId)
			if (!existingRoom) reject('Could not find room')

			let messages = Messages.find(
				{ conversationId: existingRoom._id },
				(err, data) => {
					console.log(data)
				}
			)

			resolve(messages)
		} catch (error) {
			reject(error)
		}
	})
}

exports.showFavoriteMessage = (userId) => {
	return new Promise(async (resolve, reject) => {
		Users.findById(userId, (err, user) => {
			if (err) {
				reject('Could not find user')
			} else {
				Rooms.find({ users: { $in: user._id } }, async (err, rooms) => {
					if (err) reject('Could not find rooms')

					let allMessages = []
					for (let room of rooms) {
						let roomMessage = await Messages.find({ conversationId: room._id })
						if (roomMessage.length > 0) {
							let shapeData = roomMessage.map((msg) => {
								return {
									text: msg.text,
									room: room.title,
								}
							})
							allMessages.push(shapeData)
						}
					}
					const resultData = allMessages.flat(Infinity)
					resolve(resultData)
				})
			}
		})
	})
}

exports.saveAsFavorite = (favorite, messageId) => {
	return new Promise((resolve, reject) => {
		Messages.findByIdAndUpdate(
			messageId,
			{
				favorite: favorite,
			},
			{
				new: true,
			},
			(err, data) => {
				resolve(data)
				if (err) reject('Something went wrong, pleas try again later')
			}
		)
	})
}
