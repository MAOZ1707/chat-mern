const Users = require('../model/usersModel')

exports.signUp = (user) => {
	const {firstname, lastname, password, email} = user

	return new Promise((resolve, reject) => {
		Users.findOne({email: user.email}, async (err, existingUser) => {
			if (err) reject(err)
			if (existingUser) {
				reject(err)
			} else {
				const newUser = Users.create({
					firstname,
					lastname,
					password,
					email,
				})

				resolve(newUser)
			}
		})
	})
}
exports.login = (user) => {
	const {firstname, lastname, password, email} = user

	return new Promise((resolve, reject) => {
		Users.findOne({email: user.email}, async (err, existingUser) => {
			if (err) reject(err)
			if (existingUser) {
				reject(err)
			} else {
				const newUser = Users.create({
					firstname,
					lastname,
					password,
					email,
				})

				resolve(newUser)
			}
		})
	})
}
