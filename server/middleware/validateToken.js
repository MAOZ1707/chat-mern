const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')
const Users = require('../model/usersModel')

module.exports = async (req, res, next) => {
	let token
	const {authorization} = req.headers

	// data shaping
	if (authorization && authorization.startsWith('Bearer')) {
		token = authorization.split(' ')[1]
	}

	console.log(token)

	if (!token) {
		return next(
			new AppError('You are not logged in! Please log in to get access', 401),
		)
	}

	let decoded
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET)
		console.log(decoded)
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
