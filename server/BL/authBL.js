const Users = require('../model/usersModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signUp = (user) => {
	const {name, password, email} = user

	return new Promise(async (resolve, reject) => {
		Users.findOne({email: user.email}, async (err, existingUser) => {
			if (err) reject(err)
			if (existingUser) {
				reject('User exists already, please login instead')
			} else {
				let hashedPassword
				try {
					hashedPassword = await bcrypt.hash(password, 12)
				} catch (error) {
					reject('Something went wrong, please try again later')
				}

				const newUser = Users.create({
					name,
					password: hashedPassword,
					email,
				})

				resolve(newUser)
			}
		})
	})
}

exports.login = (user) => {
	const {password, email} = user

	return new Promise((resolve, reject) => {
		Users.findOne({email: email}, async (err, existingUser) => {
			if (err) reject(err)
			if (!existingUser) {
				reject('Could not find a user, please try again ')
			} else {
				let isValidPassword = false
				try {
					isValidPassword = await bcrypt.compare(
						password,
						existingUser.password,
					)
				} catch (error) {
					reject('Login failed, please check your credentials.')
				}

				resolve(existingUser)
			}
		})
	})
}
