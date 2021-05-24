const express = require('express')
const messagesBL = require('../BL/messagesBL')
const AppError = require('../utils/appError')

const router = express.Router()

router.get('/:id', async (req, res, next) => {
	try {
		const message = await messagesBL.getMessageById(req.params.id)
		res.json({ message: message })
	} catch (error) {
		return next(new AppError(error, 404))
	}
})

router.post('/save', async (req, res, next) => {
	try {
		const saveMessage = await messagesBL.saveMessageByRoom(req.body)

		res.json({ message: saveMessage })
	} catch (error) {
		return next(new AppError(error, 404))
	}
})

router.get('/room/:id', async (req, res, next) => {
	let roomId = req.params.id
	try {
		const roomMessages = await messagesBL.getMessageByRoomId(roomId)

		res.json({ message: roomMessages })
	} catch (error) {
		return next(new AppError(error, 404))
	}
})

router.patch('/:id/favorite', async (req, res, next) => {
	let messageId = req.params.id
	let { favorite } = req.body

	try {
		const saveMessage = await messagesBL.saveAsFavorite(favorite, messageId)

		res.json({ message: saveMessage })
	} catch (error) {
		return next(new AppError(error, 404))
	}
})

router.get('/user/:id/favorite', async (req, res, next) => {
	let userId = req.params.id
	try {
		const favoriteMsg = await messagesBL.showFavoriteMessage(userId)
		console.log('Result', favoriteMsg)
		res.json({ message: favoriteMsg })
	} catch (error) {
		return next(new AppError(error, 404))
	}
})

module.exports = router
