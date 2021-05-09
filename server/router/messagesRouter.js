const express = require('express')
const messagesBL = require('../BL/messagesBL')
const AppError = require('../utils/appError')

const router = express.Router()

router.get('/:id', async (req, res, next) => {
	try {
		const message = await messagesBL.getMessageById(req.params.id)
		res.json({message: message})
	} catch (error) {
		return next(new AppError(error, 404))
	}
})

router.post('/save', async (req, res, next) => {
	try {
		const saveMessage = await messagesBL.saveMessageByRoom(req.body)

		res.json({message: saveMessage})
	} catch (error) {
		return next(new AppError(error, 404))
	}
})
router.get('/room/:id', async (req, res, next) => {
	let roomId = req.params.id
	try {
		const roomMessages = await messagesBL.getMessageByRoomId(roomId)
		console.log(roomMessages)

		res.json({message: roomMessages})
	} catch (error) {
		return next(new AppError(error, 404))
	}
})

module.exports = router
