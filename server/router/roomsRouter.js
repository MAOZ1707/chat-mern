const express = require('express')
const roomsBL = require('../BL/roomsBL')
const AppError = require('../utils/appError')

const router = express.Router()

router.get('/:id', async (req, res, next) => {
	try {
		const room = await roomsBL.getRoomById(req.params.id)
		res.json({ room: room })
	} catch (error) {
		return next(new AppError(error, 404))
	}
})
router.get('/user/:id', async (req, res, next) => {
	try {
		const rooms = await roomsBL.getRoomsByUserId(req.params.id)

		res.json({ userRooms: rooms })
	} catch (error) {
		return next(new AppError(error, 404))
	}
})

router.get('/room/:id/users', async (req, res, next) => {
	const roomId = req.params.id

	try {
		const users = await roomsBL.getRoomUsers(roomId)

		res.json({ roomUsers: users })
	} catch (error) {
		return next(new AppError(error, 404))
	}
})

router.post('/create', async (req, res, next) => {
	try {
		const room = await roomsBL.createRoom(req.body)
		if (!room) return next(new AppError('no room', 404))
		res.json({ room: room })
	} catch (error) {
		return next(new AppError(error, 404))
	}
})

router.post('/:id/addUser', async (req, res, next) => {
	const { email, admin } = req.body
	const roomId = req.params.id

	try {
		const room = await roomsBL.addUserToRoom(roomId, email, admin)

		if (!room) return next(new AppError('no room', 404))

		res.json({ room: room })
	} catch (error) {
		return next(new AppError(error, 404))
	}
})

router.patch('/:id/removeUser', async (req, res, next) => {
	const { userId, admin } = req.body
	try {
		const room = await roomsBL.removeUser(req.params.id, userId, admin)
		if (!room) return next(new AppError('no room', 404))

		res.json({ room: room })
	} catch (error) {
		return next(new AppError(error, 404))
	}
})

router.delete('/:id/delete', async (req, res, next) => {
	const { admin } = req.body

	try {
		await roomsBL.deleteRoom(req.params.id, admin)
		const loadRoom = await roomsBL.getRoomsByUserId(admin)
		res.json({ userRooms: loadRoom })
	} catch (error) {
		return next(new AppError(error, 404))
	}
})

module.exports = router
