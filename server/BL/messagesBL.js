const Messages = require('../model/messagesModel')
const Rooms = require('../model/roomsModel')

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
				sender: data.sender,
				time: new Date().getDate(),
				conversationId: existingRoom._id,
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
				{conversationId: existingRoom._id},
				(err, data) => {
					console.log(data)
				},
			)

			resolve(messages)
		} catch (error) {
			reject(error)
		}
	})
}
