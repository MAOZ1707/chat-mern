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
				Rooms.find({ admin: user._id }, (err, rooms) => {
					if (err) reject('Could not find rooms')
					rooms.forEach((room) => {
						Messages.find({ conversationId: room._id }, (err, messages) => {
							if (err) reject('No messages in this room')
							let favoriteMessages = messages.filter(
								(message) => message.favorite === true
							)

							let dataShape = favoriteMessages.map((fav) => {
								return {
									text: fav.text,
									room: room.title,
								}
							})
							// console.log(dataShape)s
							resolve(dataShape)
						})
					})
				})
			}
		})
	})
}

exports.saveAsFavorite = (favorite, messageId) => {
	return new Promise(async (resolve, reject) => {
		let findMsg = await Messages.findByIdAndUpdate(messageId, {
			favorite: favorite,
		})
		if (!findMsg) reject('Something went wrong, pleas try again later')

		resolve(findMsg)
	})
}
