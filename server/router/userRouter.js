const express = require('express')
const usersBL = require('../BL/usersBL')
const authBL = require('../BL/authBL')
const AppError = require('../utils/appError')
const jwt = require('jsonwebtoken')

const validateToken = require('../middleware/validateToken')

const router = express.Router()

const signToken = (id) => jwt.sign({ id: id }, process.env.JWT_SECRET)
router.post('/signup', async (req, res, next) => {
	try {
		const userInfo = req.body
		let user = await authBL.signUp(userInfo)

		const token = signToken(user._id)

		res.json({ token, user: user })
	} catch (error) {
		res.json({ error: error })
	}
})

router.post('/login', async (req, res, next) => {
	try {
		const userInfo = req.body

		let user = await authBL.login(userInfo)
		const token = signToken(user._id)

		res.json({ token, user: user })
	} catch (error) {
		res.json({ error: error })
	}
})

// Validation
router.use(validateToken)

router.get('/', async (req, res, next) => {
	try {
		let users = await usersBL.getUsers()

		res.json({ users })
	} catch (error) {
		return next(new AppError('Could not find users', 404))
	}
})

router.get('/user/:id', async (req, res, next) => {
	let userId = req.params.id

	try {
		let user = await usersBL.getUser(userId)

		if (req.user._id.toString() !== user._id.toString()) {
			return next(new AppError('You dont have permission please log in', 401))
		}

		res.json({
			user: {
				rooms: user.rooms,
				name: user.name,
				email: user.email,
				friends: user.friends,
			},
		})
	} catch (error) {
		return next(new AppError('Could not find user', 404))
	}
})

router.get('/:id/friends', async (req, res, next) => {
	const userId = req.params.id
	try {
		let user = await usersBL.loadUserFriends(userId)

		res.json({
			friends: user.friends,
		})
	} catch (error) {
		return next(new AppError('Could not find user friends', 404))
	}
})

router.get('/find-friend/', async (req, res, next) => {
	const { email } = req.query
	try {
		let user = await usersBL.findFriend(email)

		res.json({
			user: {
				name: user.name,
				email: user.email,
			},
		})
	} catch (error) {
		return next(new AppError('Could not find user', 404))
	}
})

router.post('/add', async (req, res, next) => {
	const { friend, admin } = req.body
	console.log(req.body)
	try {
		let user = await usersBL.addFriend(friend, admin)

		res.json({
			user: {
				name: user.name,
				email: user.email,
			},
		})
	} catch (error) {
		return next(new AppError(error, 404))
	}
})

router.post('/remove-friend', async (req, res, next) => {
	const { admin, friendEmail } = req.body

	try {
		let update = await usersBL.removeUserFromFriendList(admin, friendEmail)
		console.log(update)
		res.json({ updateUser: update })
	} catch (error) {
		return next(new AppError('Could not find user', 404))
	}
})

module.exports = router
