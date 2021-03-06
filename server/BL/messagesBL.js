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
	return new Promise((resolve, reject) => {
		Rooms.findById(data.conversationId, (err, existingRoom) => {
			if (err) reject(err)

			if (!existingRoom) reject('Could not find room')

			let newMessage = Messages.create({
				text: data.messages,
				name: data.sender,
				time: data.time,
				conversationId: existingRoom._id,
				favorite: false,
			})

			resolve(newMessage)
		})
	})
}

exports.getMessageByRoomId = (roomId) => {
	return new Promise((resolve, reject) => {
		Rooms.findById(roomId, (err, existingRoom) => {
			if (err) reject(err)
			if (!existingRoom) reject('Could not find room')

			Messages.find({ conversationId: existingRoom._id }, (err, messages) => {
				if (err) reject(err)
				resolve(messages)
			})
		})
	})
}

exports.showFavoriteMessage = (userId) => {
	return new Promise((resolve, reject) => {
		Users.findById(userId, (err, user) => {
			if (err) {
				reject('Could not find user')
			} else {
				Rooms.find({ users: { $in: user._id } }, async (err, rooms) => {
					if (err) reject('Could not find rooms')

					for (let room of rooms) {
						let roomMessage = await Messages.find({ conversationId: room._id })
						if (roomMessage.length > 0) {
							let shapeData = roomMessage.filter((msg) => {
								if (msg.favorite === true) {
									return msg
								}
							})

							let finalData = shapeData.map((data) => {
								return {
									text: data.text,
									room: room.title,
								}
							})

							resolve(finalData)
						}
					}
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
				if (err) reject('Something went wrong, pleas try again later')
				resolve(data)
			}
		)
	})
}
