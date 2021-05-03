const express = require('express')
const usersBL = require('../BL/usersBL')
const authBL = require('../BL/authBL')
const AppError = require('../utils/appError')

const router = express.Router()

router.get('/', async (req, res, next) => {
	try {
		let users = await usersBL.getUsers()
		if (!users) {
			res.json({message: 'cant find users'})
		}

		res.json({users})
	} catch (error) {
		return next(new AppError('Could not find users', 404))
	}
})

router.get('/get-user', async (req, res, next) => {
	let userId = req.body.id

	try {
		let user = await usersBL.getUser(userId)
		if (!user) {
			res.json({})
		}

		res.json({user})
	} catch (error) {
		return next(new AppError('Could not find user', 404))
	}
})

router.post('/signup', async (req, res, next) => {
	try {
		const userInfo = req.body
		let user = await authBL.signUp(userInfo)
		res.json({user: user})
	} catch (error) {
		res.json({error: error})
	}
})

router.post('/login', async (req, res, next) => {
	try {
		const userInfo = req.body
		console.log(userInfo)

		let user = await authBL.login(userInfo)

		res.json({user: user})
	} catch (error) {
		res.json({error: error})
	}
})

module.exports = router
