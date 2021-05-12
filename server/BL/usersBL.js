const Users = require('../model/usersModel')

exports.getUsers = () => {
	return new Promise((resolve, reject) => {
		Users.find({}, (err, users) => {
			if (err) {
				reject(err)
			} else {
				let shapedUsers = users.map((user) => {
					return user
				})
				resolve(shapedUsers)
			}
		})
	})
}

exports.getUser = (userId) => {
	return new Promise((resolve, reject) => {
		if (!userId) {
			reject('please provide id')
		}

		Users.findById({_id: userId}, (err, user) => {
			if (err) {
				reject('Could not find user')
			} else {
				resolve(user)
			}
		})
	})
}

exports.findFriend = (email) => {
	return new Promise((resolve, reject) => {
		if (!email) {
			reject('please provide user email')
		}

		Users.findOne({email: email}, (err, user) => {
			if (err) {
				reject('Could not find user with provided email')
			} else {
				resolve(user)
			}
		})
	})
}
