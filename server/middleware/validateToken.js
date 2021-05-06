const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')
const Users = require('../model/usersModel')

module.exports = async (req, res, next) => {
	let token

	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer ')
		) {
			token = req.headers.authorization.split(' ')[1]
		}

		if (!token) {
			return next(
				new AppError('You are not logged in! Please log in to get access', 401),
			)
		}
	} catch (error) {
		console.log(error)
	}

	let decoded
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET)
	} catch (error) {
		return next(new AppError('Authentication failed!', 403))
	}

	let existingUser
	try {
		existingUser = await Users.findById(decoded.id)
	} catch (error) {
		return next(new AppError('Authentication failed!', 403))
	}

	if (!existingUser) {
		return next(new AppError('Could not find user!', 404))
	}

	req.user = existingUser
	next()
}
